import {Repositories} from "..";
import {Models} from "../../Models";
import {Helpers} from "../../helpers";
import {Storage} from "@ssofy/javascript-sdk";

export class OTPRepository implements Repositories.OTPRepository {
    protected codeStorage: Storage;
    protected userRepository: Repositories.UserRepository;

    constructor(codeStorage: Storage, userRepository: Repositories.UserRepository) {
        this.codeStorage = codeStorage;
        this.userRepository = userRepository;
    }

    async findAllByAction(userId: string, action: string, ip?: string): Promise<Models.OTPOptionEntity[]> {
        const user = await this.userRepository.findById(userId, ip);
        if (!userId) {
            return [];
        }

        let options: Models.OTPOptionEntity[] = [];

        const otpAction: 'login' | 'password_reset' | 'password_renew' = <'login' | 'password_reset' | 'password_renew'>action;

        if (user?.email) {
            options.push(this.generateEmailOtpOption(otpAction, user));
        }

        if (user?.phone) {
            options.push(this.generateSMSOtpOption(otpAction, user));
        }

        return options;
    }

    async findById(optionId: string, ip?: string): Promise<Models.OTPOptionEntity | null> {
        const [method, action, userId] = optionId.split('/');

        const otpAction: 'login' | 'password_reset' | 'password_renew' = <'login' | 'password_reset' | 'password_renew'>action;

        const user: Models.UserEntity | null = await this.userRepository.findById(userId, ip);
        if (!user) {
            return null;
        }

        switch (method) {
            case 'email':
                return this.generateEmailOtpOption(otpAction, user);

            case 'sms':
                return this.generateSMSOtpOption(otpAction, user);
        }

        return null;
    }

    async newVerificationCode(option: Models.OTPOptionEntity, ip?: string): Promise<string> {
        const group = `otp-${option.id}`;

        const code = Helpers.randomDigits(6);
        const key = this.codeKey(code, group);

        await this.codeStorage.put(key, option.user_id, 60 * 60);

        return code;
    }

    async destroyVerificationCode(optionId: string, code: string, ip?: string): Promise<void> {
        const group = `otp-${optionId}`;
        const key = this.codeKey(code, group);

        return this.codeStorage.delete(key);
    }

    async verify(optionId: string, code: string, ip?: string): Promise<boolean> {
        const group = `otp-${optionId}`;
        const key = this.codeKey(code, group);

        const userId = await this.codeStorage.get(key);
        if (!userId) {
            return false;
        }

        // mark user's email/phone as verified

        const option: Models.OTPOptionEntity | null = await this.findById(optionId);
        if (!option) {
            return false;
        }

        const user: Models.UserEntity | null = await this.userRepository.findById(option.user_id, ip);
        if (!user) {
            return false;
        }

        if (option.type === 'email' && !user.email_verified) {
            user.email_verified = true;
            await this.userRepository.update(user, ip);
        }

        if (option.type === 'sms' && !user.phone_verified) {
            user.phone_verified = true;
            await this.userRepository.update(user, ip);
        }

        return true;
    }

    protected generateEmailOtpOption(action: 'login' | 'password_reset' | 'password_renew', user: Models.UserEntity): Models.OTPOptionEntity {
        return {
            id: `email/${action}/${user.id}`,
            type: 'email',
            to: user.email ?? '',
            hint: Helpers.maskEmailAddress(user.email ?? ''),
            user_id: user.id,
            action: action,
        };
    }

    protected generateSMSOtpOption(action: 'login' | 'password_reset' | 'password_renew', user: Models.UserEntity): Models.OTPOptionEntity {
        {
            return {
                id: `sms/${action}/${user.id}`,
                type: 'sms',
                to: user.phone ?? '',
                hint: Helpers.maskPhoneNumber(user.phone ?? ''),
                user_id: user.id,
                action: action,
            };
        }
    }

    private codeKey(code: string, group: string = '') {
        return `otp:code:${group}:${code}`;
    }
}

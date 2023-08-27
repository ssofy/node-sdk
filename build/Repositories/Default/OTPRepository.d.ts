import { Repositories } from "..";
import { Models } from "../../Models";
import { Storage } from "@ssofy/javascript-sdk";
export declare class OTPRepository implements Repositories.OTPRepository {
    protected codeStorage: Storage;
    protected userRepository: Repositories.UserRepository;
    constructor(codeStorage: Storage, userRepository: Repositories.UserRepository);
    findAllByAction(userId: string, action: string, ip?: string): Promise<Models.OTPOptionEntity[]>;
    findById(optionId: string, ip?: string): Promise<Models.OTPOptionEntity | null>;
    newVerificationCode(option: Models.OTPOptionEntity, ip?: string): Promise<string>;
    destroyVerificationCode(optionId: string, code: string, ip?: string): Promise<void>;
    verify(optionId: string, code: string, ip?: string): Promise<boolean>;
    protected generateEmailOtpOption(action: 'login' | 'password_reset' | 'password_renew', user: Models.UserEntity): Models.OTPOptionEntity;
    protected generateSMSOtpOption(action: 'login' | 'password_reset' | 'password_renew', user: Models.UserEntity): Models.OTPOptionEntity;
    private codeKey;
}

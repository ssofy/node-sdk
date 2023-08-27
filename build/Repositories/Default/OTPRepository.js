"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPRepository = void 0;
const helpers_1 = require("../../helpers");
class OTPRepository {
    constructor(codeStorage, userRepository) {
        this.codeStorage = codeStorage;
        this.userRepository = userRepository;
    }
    findAllByAction(userId, action, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(userId, ip);
            if (!userId) {
                return [];
            }
            let options = [];
            const otpAction = action;
            if (user === null || user === void 0 ? void 0 : user.email) {
                options.push(this.generateEmailOtpOption(otpAction, user));
            }
            if (user === null || user === void 0 ? void 0 : user.phone) {
                options.push(this.generateSMSOtpOption(otpAction, user));
            }
            return options;
        });
    }
    findById(optionId, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const [method, action, userId] = optionId.split('/');
            const otpAction = action;
            const user = yield this.userRepository.findById(userId, ip);
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
        });
    }
    newVerificationCode(option, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = `otp-${option.id}`;
            const code = helpers_1.Helpers.randomDigits(6);
            const key = this.codeKey(code, group);
            yield this.codeStorage.put(key, option.user_id, 60 * 60);
            return code;
        });
    }
    destroyVerificationCode(optionId, code, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = `otp-${optionId}`;
            const key = this.codeKey(code, group);
            return this.codeStorage.delete(key);
        });
    }
    verify(optionId, code, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = `otp-${optionId}`;
            const key = this.codeKey(code, group);
            const userId = yield this.codeStorage.get(key);
            if (!userId) {
                return false;
            }
            // mark user's email/phone as verified
            const option = yield this.findById(optionId);
            if (!option) {
                return false;
            }
            const user = yield this.userRepository.findById(option.user_id, ip);
            if (!user) {
                return false;
            }
            if (option.type === 'email' && !user.email_verified) {
                user.email_verified = true;
                yield this.userRepository.update(user, ip);
            }
            if (option.type === 'sms' && !user.phone_verified) {
                user.phone_verified = true;
                yield this.userRepository.update(user, ip);
            }
            return true;
        });
    }
    generateEmailOtpOption(action, user) {
        var _a, _b;
        return {
            id: `email/${action}/${user.id}`,
            type: 'email',
            to: (_a = user.email) !== null && _a !== void 0 ? _a : '',
            hint: helpers_1.Helpers.maskEmailAddress((_b = user.email) !== null && _b !== void 0 ? _b : ''),
            user_id: user.id,
            action: action,
        };
    }
    generateSMSOtpOption(action, user) {
        var _a, _b;
        {
            return {
                id: `sms/${action}/${user.id}`,
                type: 'sms',
                to: (_a = user.phone) !== null && _a !== void 0 ? _a : '',
                hint: helpers_1.Helpers.maskPhoneNumber((_b = user.phone) !== null && _b !== void 0 ? _b : ''),
                user_id: user.id,
                action: action,
            };
        }
    }
    codeKey(code, group = '') {
        return `otp:code:${group}:${code}`;
    }
}
exports.OTPRepository = OTPRepository;

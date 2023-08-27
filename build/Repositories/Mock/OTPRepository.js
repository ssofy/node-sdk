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
class OTPRepository {
    destroyVerificationCode(optionId, code, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    findAllByAction(userId, action, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.options(userId, action);
        });
    }
    findById(optionId, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const [entity, userId, action] = optionId.split('/');
            return this.options(userId, action)
                .filter((option) => {
                return option.id === optionId;
            })[0];
        });
    }
    newVerificationCode(option, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            return '777777';
        });
    }
    verify(optionId, code, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            return code === '777777';
        });
    }
    options(userId, action) {
        return [
            {
                id: `user/${userId}/sms`,
                type: 'sms',
                to: '+4*********92',
                hint: '+4*********92',
                user_id: userId,
                action: action,
            },
            {
                id: `user/${userId}/call`,
                type: 'call',
                to: '+4*********92',
                hint: '+4*********92',
                user_id: userId,
                action: action,
            },
            {
                id: `user/${userId}/email`,
                type: 'email',
                to: '***st@***fy.com',
                hint: '***st@***fy.com',
                user_id: userId,
                action: action,
            }
        ];
    }
}
exports.OTPRepository = OTPRepository;

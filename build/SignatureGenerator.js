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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureGenerator = void 0;
const crypto_1 = __importDefault(require("crypto"));
class SignatureGenerator {
    generate(url, params, secret, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = (new URL(url)).pathname;
            const toSign = path + this.getValues(params).join('') + (salt || '');
            const hash = yield this.hmac(toSign, secret);
            return {
                hash: hash,
                salt: salt
            };
        });
    }
    getValues(obj) {
        let values = [];
        let flatten = Object.keys(obj)
            .sort().reduce((r, k) => (r[k] = obj[k], r), {});
        for (let key in flatten) {
            const value = flatten[key];
            if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
                values.push(...this.getValues(value));
                continue;
            }
            if (typeof value == 'boolean') {
                values.push(value ? '1' : '0');
                continue;
            }
            values.push(value ? value.toString() : '');
        }
        return values;
    }
    hmac(message, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            const hmac = crypto_1.default.createHmac('sha256', secret);
            hmac.update(message);
            return hmac.digest('hex');
        });
    }
}
exports.SignatureGenerator = SignatureGenerator;

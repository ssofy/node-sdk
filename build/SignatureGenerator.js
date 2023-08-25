"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.SignatureGenerator = void 0;
const crypto = __importStar(require("crypto"));
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
            const msgBuffer = new TextEncoder().encode(message);
            const hmacBuffer = yield crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['sign']).then(key => crypto.subtle.sign('HMAC', key, msgBuffer));
            const hashArray = Array.from(new Uint8Array(hmacBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        });
    }
}
exports.SignatureGenerator = SignatureGenerator;

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
exports.SignatureVerifier = void 0;
class SignatureVerifier {
    constructor(generator) {
        this.signatureGenerator = generator;
    }
    verifyBase64Signature(url, params, secret, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedSignature = (JSON.parse(Buffer.from(signature, 'base64').toString('utf8')));
                const generatedSignature = yield this.signatureGenerator.generate(url, params, secret, decodedSignature.salt);
                return generatedSignature.hash === decodedSignature.hash;
            }
            catch (e) {
                return false;
            }
        });
    }
}
exports.SignatureVerifier = SignatureVerifier;

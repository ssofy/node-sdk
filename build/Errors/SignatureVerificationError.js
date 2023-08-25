"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureVerificationError = void 0;
const BaseError_1 = require("./BaseError");
class SignatureVerificationError extends BaseError_1.BaseError {
    constructor() {
        super('Signature verification failed');
    }
}
exports.SignatureVerificationError = SignatureVerificationError;

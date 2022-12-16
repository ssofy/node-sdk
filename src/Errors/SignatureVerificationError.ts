import {BaseError} from "./BaseError";

export class SignatureVerificationError extends BaseError {
    constructor() {
        super('Signature verification failed');
    }
}
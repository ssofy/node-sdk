import {BaseError} from "./BaseError";

export class InvalidTokenError extends BaseError {
    constructor() {
        super('Invalid or Expired token');
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenError = void 0;
const BaseError_1 = require("./BaseError");
class InvalidTokenError extends BaseError_1.BaseError {
    constructor() {
        super('Invalid or Expired token');
    }
}
exports.InvalidTokenError = InvalidTokenError;

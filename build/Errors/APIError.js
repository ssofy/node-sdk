"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
const BaseError_1 = require("./BaseError");
class APIError extends BaseError_1.BaseError {
    constructor() {
        super('Cannot communicate with API. Check your API Key or Url.');
    }
}
exports.APIError = APIError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownTemplateEngineError = void 0;
const BaseError_1 = require("./BaseError");
class UnknownTemplateEngineError extends BaseError_1.BaseError {
    constructor(engine) {
        super(`Unknown template engine: ${engine}`);
        this.engine = engine;
    }
}
exports.UnknownTemplateEngineError = UnknownTemplateEngineError;

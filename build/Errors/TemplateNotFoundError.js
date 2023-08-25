"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateNotFoundError = void 0;
const BaseError_1 = require("./BaseError");
class TemplateNotFoundError extends BaseError_1.BaseError {
    constructor(templateName) {
        super(`Template not found: ${templateName}`);
        this.templateName = templateName;
    }
}
exports.TemplateNotFoundError = TemplateNotFoundError;

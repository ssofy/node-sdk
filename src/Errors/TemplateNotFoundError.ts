import {BaseError} from "./BaseError";

export class TemplateNotFoundError extends BaseError {
    constructor(public templateName: string) {
        super(`Template not found: ${templateName}`);
    }
}

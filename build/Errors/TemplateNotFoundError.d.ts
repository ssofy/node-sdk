import { BaseError } from "./BaseError";
export declare class TemplateNotFoundError extends BaseError {
    templateName: string;
    constructor(templateName: string);
}

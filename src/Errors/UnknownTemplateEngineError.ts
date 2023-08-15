import {BaseError} from "./BaseError";

export class UnknownTemplateEngineError extends BaseError {
    constructor(public engine: string) {
        super(`Unknown template engine: ${engine}`);
    }
}

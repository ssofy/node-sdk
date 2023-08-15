import { BaseError } from "./BaseError";
export declare class UnknownTemplateEngineError extends BaseError {
    engine: string;
    constructor(engine: string);
}

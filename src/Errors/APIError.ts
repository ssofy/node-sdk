import {BaseError} from "./BaseError";

export class APIError extends BaseError {
    constructor() {
        super('Cannot communicate with API. Check your API Key or Url.');
    }
}
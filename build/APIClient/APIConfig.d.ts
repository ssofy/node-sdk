import { APIConfigParameters } from "./APIConfigParameters";
import { Storage } from "@ssofy/javascript-sdk";
export declare class APIConfig implements APIConfigParameters {
    domain: string;
    key: string;
    secret: string;
    cacheStore?: Storage;
    cacheTtl?: number;
    secure?: boolean;
    constructor(params: APIConfigParameters);
}

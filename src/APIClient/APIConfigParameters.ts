import {Storage} from "@ssofy/javascript-sdk";

export interface APIConfigParameters {
    domain: string;
    key: string;
    secret: string;
    cacheStore?: Storage;
    cacheTtl?: number;
    secure?: boolean;
}

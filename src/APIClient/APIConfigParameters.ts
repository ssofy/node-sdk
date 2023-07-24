import {Storage} from "../Storage/Storage";

export interface APIConfigParameters {
    domain: string;
    key: string;
    secret: string;
    cacheStore?: Storage;
    cacheTtl?: number;
    secure?: boolean;
}

import { Storage } from "./Storage/Storage";
export interface ClientConfig {
    domain: string;
    key: string;
    secret: string;
    cacheStore?: Storage;
    cacheTtl?: number;
    secure?: boolean;
}

import {APIConfigParameters} from "./APIConfigParameters";
import {Storage} from "../Storage/Storage";
import {NullStorage} from "../Storage/NullStorage";

export class APIConfig implements APIConfigParameters {
    // @ts-ignore
    domain: string;
    // @ts-ignore
    key: string;
    // @ts-ignore
    secret: string;
    cacheStore?: Storage;
    cacheTtl?: number;
    secure?: boolean;

    constructor(params: APIConfigParameters) {
        Object.assign(this, params);

        this.cacheStore = this.cacheStore ?? new NullStorage();
        this.cacheTtl = this.cacheTtl ?? 60 * 60 * 3;
        this.secure = this.secure ?? false;
    }
}
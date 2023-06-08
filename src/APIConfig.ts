import {Storage} from "./Storage/Storage";

export interface APIConfig {
    domain: string
    key: string
    secret: string
    cacheStore?: Storage
    cacheTtl?: number
    secure?: boolean
}

import { StringMap } from "@openid/appauth/src/types";
export declare class ResourceOwnerRequest {
    token: string;
    constructor(token: string);
    toJson(): any;
    toStringMap(): StringMap;
}

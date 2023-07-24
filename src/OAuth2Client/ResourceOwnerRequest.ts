import {StringMap} from "@openid/appauth/src/types";

export class ResourceOwnerRequest {
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    toJson(): any {
        return {
            token: this.token
        };
    }

    toStringMap(): StringMap {
        let json = this.toJson();

        return (json as any);
    }
}
import { Storage } from "../Storage/Storage";
export interface OAuth2ConfigParameters {
    url?: string;
    clientId?: string;
    clientSecret?: string;
    redirectUri?: string;
    pkceVerification?: boolean;
    timeout?: number;
    scopes?: string[];
    locale?: string;
    stateStore?: Storage;
    stateTtl?: number;
}

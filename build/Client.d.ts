import { ClientConfig } from "./ClientConfig";
import { APIResponse } from "./Models/APIResponse";
export declare class Client {
    private config;
    private readonly cache;
    private readonly signatureGenerator;
    constructor(config: ClientConfig);
    verifyAuthentication(token: string): Promise<APIResponse>;
    authenticatedUser(token: string, cache?: boolean): Promise<APIResponse>;
    findUserById(id: string, cache?: boolean): Promise<APIResponse>;
    invalidateTokenCache(token: string): Promise<void>;
    purgeTokenCache(): Promise<void>;
    private requestAndCache;
    private request;
    private sanitizeToken;
    private forceCast;
}

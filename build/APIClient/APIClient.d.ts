import { APIConfig } from "./APIConfig";
import { APIResponse } from "../Models/APIResponse";
export declare class APIClient {
    private readonly config;
    private readonly signatureGenerator;
    constructor(config: APIConfig);
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

import { APIConfig } from "./APIConfig";
import { Models } from "../Models";
export declare class APIClient {
    private readonly config;
    private readonly signatureGenerator;
    constructor(config: APIConfig);
    verifyAuthentication(token: string): Promise<Models.APIResponse>;
    authenticatedUser(token: string, cache?: boolean): Promise<Models.APIResponse>;
    findUserById(id: string, cache?: boolean): Promise<Models.APIResponse>;
    invalidateTokenCache(token: string): Promise<void>;
    purgeTokenCache(): Promise<void>;
    private requestAndCache;
    private request;
    private sanitizeToken;
    private forceCast;
}

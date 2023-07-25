import { OAuth2Config } from "./OAuth2Config";
import { UserEntity } from "../Models/Entities/UserEntity";
import { TokenResponse } from "./TokenResponse";
export declare class OAuth2Client {
    private config;
    private stateStore;
    constructor(config: OAuth2Config);
    initAuthCodeFlow(uri: string, nextUri: string): Promise<{
        state: string;
        uri: string;
    }>;
    continueAuthCodeFlow(state: string, code: string): Promise<{
        state: string;
        uri: string;
        token: TokenResponse;
    }>;
    getConfig(state: string): Promise<OAuth2Config | null>;
    getUserInfo(state: string): Promise<UserEntity | null>;
    refreshUserInfo(state: string): Promise<UserEntity | null>;
    getAccessToken(state: string): Promise<TokenResponse | null>;
    private getState;
    private saveState;
    private deleteState;
    private stateStorageKey;
    private getUrlParams;
    private getUrl;
}

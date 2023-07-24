import {OAuth2ConfigParameters} from "./OAuth2ConfigParameters";
import {OAuth2Config} from "./OAuth2Config";
import {Storage} from "../Storage/Storage";
import {NullStorage} from "../Storage/NullStorage";
import {UserEntity} from "../Models/Entities/UserEntity";
import {ResourceOwnerRequest} from "./ResourceOwnerRequest";
import {AuthorizationRequestHandler} from "./AuthorizationRequestHandler";
import {UserInfoRequestHandler} from "./UserInfoRequestHandler";
import {TokenResponse} from "./TokenResponse";
import {
    AuthorizationRequest,
    AuthorizationServiceConfiguration,
    AuthorizationRequestJson,
    BaseTokenRequestHandler,
    TokenRequest,
    StringMap,
    GRANT_TYPE_AUTHORIZATION_CODE, GRANT_TYPE_REFRESH_TOKEN
} from "@openid/appauth";
import {NodeCrypto, NodeRequestor} from "@openid/appauth/built/node_support";

export class OAuth2Client {
    private config: OAuth2Config;

    private stateStore: Storage;

    constructor(config: OAuth2Config) {
        this.config = config;
        this.stateStore = config.stateStore ?? new NullStorage();
    }

    async initAuthCodeFlow(uri: string, nextUri: string): Promise<{ state: string, uri: string }> {
        let authorizationUrl = this.config.authorizationUrl() ?? '';

        let extras = this.getUrlParams(authorizationUrl);

        authorizationUrl = this.getUrl(authorizationUrl);

        let request = new AuthorizationRequest(<AuthorizationRequestJson>{
            client_id: this.config.clientId ?? '',
            redirect_uri: this.config.redirectUri ?? '',
            scope: this.config.scopes?.join(' ') ?? '',
            response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
            extras: extras,
        }, new NodeCrypto(), this.config.pkceVerification);

        let stateData: any = {
            uri: nextUri,
            config: this.config.toJson(),
        }

        if (this.config.pkceVerification) {
            await request.setupCodeVerifier();
            stateData['pkce'] = {
                code: request.internal?.code_verifier
            };
        }

        await this.saveState(request.state, stateData, this.config.timeout);

        const authorizationHandler = new AuthorizationRequestHandler();

        return {
            state: request.state,
            uri: authorizationHandler.buildRequestUrl(<AuthorizationServiceConfiguration>{
                authorizationEndpoint: authorizationUrl,
            }, request),
        };
    }

    async continueAuthCodeFlow(state: string, code: string): Promise<{ state: string, uri: string, token: TokenResponse }> {
        const stateData = await this.getState(state);

        const config = new OAuth2Config(<OAuth2ConfigParameters>stateData.config);

        let extras: StringMap | undefined = undefined;
        if (config.pkceVerification) {
            extras = {};
            extras['code_verifier'] = stateData.pkce.code;
        }

        let request: TokenRequest = new TokenRequest({
            client_id: config.clientId ?? '',
            redirect_uri: config.redirectUri ?? '',
            grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
            code: code,
            extras: extras,
        });

        const tokenHandler = new BaseTokenRequestHandler(new NodeRequestor());

        const response = await tokenHandler.performTokenRequest(<AuthorizationServiceConfiguration>{
            tokenEndpoint: this.getUrl(this.config.tokenUrl() ?? ''),
        }, request);

        stateData['token'] = response.toJson();

        await this.saveState(state, stateData, this.config.stateTtl);

        return stateData;
    }

    async getConfig(state: string): Promise<OAuth2Config | null> {
        const stateData = await this.getState(state);

        if (!stateData.config) {
            return null;
        }

        return new OAuth2Config(<OAuth2ConfigParameters>stateData.config);
    }

    async getUserInfo(state: string): Promise<UserEntity | null> {
        const stateData = await this.getState(state);

        if (!stateData.user) {
            return await this.refreshUserInfo(state);
        }

        return <UserEntity>stateData.user;
    }

    async refreshUserInfo(state: string): Promise<UserEntity | null> {
        const stateData = await this.getState(state);

        if (!stateData.token) {
            return null;
        }

        const userInfoHandler = new UserInfoRequestHandler();

        const user = await userInfoHandler.performUserInfoRequest(<AuthorizationServiceConfiguration>{
            userInfoEndpoint: this.config.resourceOwnerUrl(),
        }, new ResourceOwnerRequest(stateData.token.access_token));

        stateData['user'] = user;

        await this.saveState(state, stateData, this.config.stateTtl);

        return <UserEntity>user;
    }

    async getAccessToken(state: string): Promise<TokenResponse | null> {
        const stateData = await this.getState(state);

        if (!stateData.token) {
            return null;
        }

        const token = <TokenResponse>stateData['token'];

        const expiryTime = (token.issued_at ?? 0) + Number.parseInt(token.expires_in ?? '0');

        if (expiryTime >= Math.floor(Date.now() / 1000)) {
            return token;
        }

        const config = new OAuth2Config(<OAuth2ConfigParameters>stateData['config']);

        let extras: StringMap = {
            'client_secret': config.clientSecret ?? '',
        };

        if (config.pkceVerification) {
            extras['code_verifier'] = stateData.pkce.code;
        }

        let request: TokenRequest = new TokenRequest({
            client_id: config.clientId ?? '',
            redirect_uri: config.redirectUri ?? '',
            grant_type: GRANT_TYPE_REFRESH_TOKEN,
            refresh_token: token.refresh_token,
            extras: extras,
        });

        const tokenHandler = new BaseTokenRequestHandler(new NodeRequestor());

        const response = await tokenHandler.performTokenRequest(<AuthorizationServiceConfiguration>{
            tokenEndpoint: this.config.tokenUrl(),
        }, request);

        stateData['token'] = response.toJson();

        await this.saveState(state, stateData, this.config.stateTtl);

        return <TokenResponse>stateData.token;
    }

    private async getState(state: string): Promise<any> {
        const data = await this.stateStore.get(this.stateStorageKey(state));
        if (!data) {
            return null;
        }

        return JSON.parse(data);
    }

    private async saveState(state: string, data: any, timeout: number = 0): Promise<void> {
        const key = this.stateStorageKey(state);

        await this.stateStore.delete(key);

        await this.stateStore.put(key, JSON.stringify(data), timeout);
    }

    private async deleteState(state: string) {
        await this.stateStore.delete(this.stateStorageKey(state));
    }

    private stateStorageKey(state: string): string {
        return `oauth:state:${state}`;
    }

    private getUrlParams(url: string): StringMap {
        let paramObject: StringMap = {};
        let myUrl = new URL(url);

        myUrl.searchParams.forEach((value: string, key: string) => {
            paramObject[key] = value;
        });

        return paramObject;
    }

    private getUrl(url: string): string {
        let result = new URL(url);
        return result.origin + result.pathname;
    }
}

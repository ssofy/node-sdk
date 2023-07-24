import {
    AuthorizationRequestHandler as BaseAuthorizationRequestHandler,
    AuthorizationRequest,
    AuthorizationServiceConfiguration,
    AuthorizationRequestResponse,
    BasicQueryStringUtils,
    Crypto,
    DefaultCrypto,
} from "@openid/appauth";

export class AuthorizationRequestHandler extends BaseAuthorizationRequestHandler {
    constructor() {
        const utils = new BasicQueryStringUtils();
        const crypto: Crypto = new DefaultCrypto();
        super(utils, crypto);
    }

    public buildRequestUrl(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest): string {
        return super.buildRequestUrl(configuration, request);
    }

    protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null> {
        return Promise.resolve(null);
    }

    performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest): void {
    }
}
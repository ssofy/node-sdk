import { AuthorizationRequestHandler as BaseAuthorizationRequestHandler, AuthorizationRequest, AuthorizationServiceConfiguration, AuthorizationRequestResponse } from "@openid/appauth";
export declare class AuthorizationRequestHandler extends BaseAuthorizationRequestHandler {
    constructor();
    buildRequestUrl(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest): string;
    protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null>;
    performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest): void;
}

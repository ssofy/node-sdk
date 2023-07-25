import { AuthorizationServiceConfiguration, Requestor } from "@openid/appauth";
import { ResourceOwnerRequest } from "./ResourceOwnerRequest";
export declare class UserInfoRequestHandler {
    readonly requester: Requestor;
    performUserInfoRequest(configuration: AuthorizationServiceConfiguration, request: ResourceOwnerRequest): Promise<any>;
}

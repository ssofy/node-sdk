import * as APIResponseInternal from "./APIResponse";
import * as SignatureInternal from "./Signature";
import * as TokenInternal from "./Token";

import * as AuthResponseEntityInternal from "./Entities/AuthResponseEntity";
import * as TokenEntityInternal from "./Entities/TokenEntity";
import * as ClientEntityInternal from "./Entities/ClientEntity";
import * as OTPOptionEntityInternal from "./Entities/OTPOptionEntity";
import * as ScopeEntityInternal from "./Entities/ScopeEntity";
import * as UserEntityInternal from "./Entities/UserEntity";

export namespace Models {
    export type APIResponse = APIResponseInternal.APIResponse;
    export type Signature = SignatureInternal.Signature;
    export type Token = TokenInternal.Token;

    export type AuthResponseEntity = AuthResponseEntityInternal.AuthResponseEntity;
    export type TokenEntity = TokenEntityInternal.TokenEntity;
    export type ClientEntity = ClientEntityInternal.ClientEntity;
    export type OTPOptionEntity = OTPOptionEntityInternal.OTPOptionEntity;
    export type ScopeEntity = ScopeEntityInternal.ScopeEntity;
    export type UserEntity = UserEntityInternal.UserEntity;
}

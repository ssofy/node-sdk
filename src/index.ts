import * as APIResponseTypes from "./Models/APIResponse";
import * as SignatureTypes from "./Models/Signature";
import * as TokenTypes from "./Models/Token";

import * as AuthResponse from "./Models/Entities/AuthResponseEntity";
import * as Token from "./Models/Entities/TokenEntity";
import * as Client from "./Models/Entities/ClientEntity";
import * as OTPOption from "./Models/Entities/OTPOptionEntity";
import * as Scope from "./Models/Entities/ScopeEntity";
import * as User from "./Models/Entities/UserEntity";

import * as ClientRepo from "./Repositories/ClientRepository";
import * as OTPRepo from "./Repositories/OTPRepository";
import * as ScopeRepo from "./Repositories/ScopeRepository";
import * as UserRepo from "./Repositories/UserRepository";

export {APIConfig} from "./APIConfig";
export {APIClient} from "./APIClient";
export {OAuth2Config} from "./OAuth2Config";
export {OAuth2Client} from "./OAuth2Client";
export {SignatureGenerator} from "./SignatureGenerator";
export {SignatureVerifier} from "./SignatureVerifier";

export namespace Models {
    export type APIResponse = APIResponseTypes.APIResponse;
    export type Signature = SignatureTypes.Signature;
    export type Token = TokenTypes.Token;
}

export namespace Entities {
    export type AuthResponseEntity = AuthResponse.AuthResponseEntity;
    export type TokenEntity = Token.TokenEntity;
    export type ClientEntity = Client.ClientEntity;
    export type OTPOptionEntity = OTPOption.OTPOptionEntity;
    export type ScopeEntity = Scope.ScopeEntity;
    export type UserEntity = User.UserEntity;
}

export namespace Repositories {
    export type ClientRepository = ClientRepo.ClientRepository;
    export type OTPRepository = OTPRepo.OTPRepository;
    export type ScopeRepository = ScopeRepo.ScopeRepository;
    export type UserRepository = UserRepo.UserRepository;
}

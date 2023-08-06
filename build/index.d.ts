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
export { APIConfig } from "./APIConfig";
export { APIClient } from "./APIClient";
export { OAuth2Config } from "./OAuth2Config";
export { OAuth2Client } from "./OAuth2Client";
export { SignatureGenerator } from "./SignatureGenerator";
export { SignatureVerifier } from "./SignatureVerifier";
export declare namespace Models {
    type APIResponse = APIResponseTypes.APIResponse;
    type Signature = SignatureTypes.Signature;
    type Token = TokenTypes.Token;
}
export declare namespace Entities {
    type AuthResponseEntity = AuthResponse.AuthResponseEntity;
    type TokenEntity = Token.TokenEntity;
    type ClientEntity = Client.ClientEntity;
    type OTPOptionEntity = OTPOption.OTPOptionEntity;
    type ScopeEntity = Scope.ScopeEntity;
    type UserEntity = User.UserEntity;
}
export declare namespace Repositories {
    type ClientRepository = ClientRepo.ClientRepository;
    type OTPRepository = OTPRepo.OTPRepository;
    type ScopeRepository = ScopeRepo.ScopeRepository;
    type UserRepository = UserRepo.UserRepository;
}

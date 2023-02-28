import {Token} from "./Token";
import {UserEntity} from "./Entities/UserEntity";

export interface APIResponse {
    token?: Token
    user?: UserEntity
}

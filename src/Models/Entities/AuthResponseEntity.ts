import {TokenEntity} from "./TokenEntity";
import {UserEntity} from "./UserEntity";

export interface AuthResponseEntity {
    user: UserEntity
    token?: TokenEntity
}

import { Token } from "./Token";
import { UserEntity } from "./UserEntity";
export interface APIResponse {
    token?: Token;
    user?: UserEntity;
}

import { Models } from "..";
export interface AuthResponseEntity {
    user: Models.UserEntity;
    token?: Models.TokenEntity;
}

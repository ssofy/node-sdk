import { Models } from ".";
export interface APIResponse {
    token?: Models.Token;
    user?: Models.UserEntity;
}

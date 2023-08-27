import { Models } from "../Models";
export interface UserFilter {
    filter(user: Models.UserEntity, scopes: string[]): Promise<Models.UserEntity>;
}

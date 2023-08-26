import {Filters} from ".";
import {Models} from "../Models";

export class DefaultUserFilter implements Filters.UserFilter {
    filter(user: Models.UserEntity, scopes: string[]): Promise<Models.UserEntity> {
        return Promise.resolve(user);
    }
}

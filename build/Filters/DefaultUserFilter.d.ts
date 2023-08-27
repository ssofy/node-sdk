import { Filters } from ".";
import { Models } from "../Models";
export declare class DefaultUserFilter implements Filters.UserFilter {
    filter(user: Models.UserEntity, scopes: string[]): Promise<Models.UserEntity>;
}

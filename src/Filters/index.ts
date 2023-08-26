import * as UserFilterInternal from "./UserFilter";
import * as DefaultUserFilterInternal from "./DefaultUserFilter";

export namespace Filters {
    export type UserFilter = UserFilterInternal.UserFilter;
    export import DefaultUserFilter = DefaultUserFilterInternal.DefaultUserFilter;
}

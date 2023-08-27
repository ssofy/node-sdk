import * as UserFilterInternal from './UserTransformer';
import * as DefaultUserTransformerInternal from './DefaultUserTransformer';
export declare namespace Transformers {
    type UserTransformer = UserFilterInternal.UserTransformer;
    export import DefaultUserTransformer = DefaultUserTransformerInternal.DefaultUserTransformer;
}

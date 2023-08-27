import * as TransformerInternal from './Transformer';
import * as UserFilterInternal from './UserTransformer';
export declare namespace Transformers {
    type Transformer = TransformerInternal.Transformer;
    export import UserTransformer = UserFilterInternal.UserTransformer;
}

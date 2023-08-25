import * as TransformerInternal from './Transformer'
import * as UserFilterInternal from './UserTransformer'

export namespace Transformers {
    export type Transformer = TransformerInternal.Transformer;
    export import UserTransformer = UserFilterInternal.UserTransformer;
}

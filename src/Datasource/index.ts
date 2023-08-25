import * as ItemInternal from './Item'
import * as ParametersInternal from './Criteria'
import * as ConnectionInternal from './Connection'
import * as PrismaConnectionInternal from './PrismaConnection'

export namespace Datasource {
    export type Criteria = ParametersInternal.Criteria;
    export type Item = ItemInternal.Item;
    export import Connection = ConnectionInternal.Connection;
    export import PrismaConnection = PrismaConnectionInternal.PrismaConnection;
}

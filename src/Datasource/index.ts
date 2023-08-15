import * as ConnectionInternal from './Connection'
import * as ParametersInternal from './Parameters'
import * as RecordInternal from './Record'

export namespace Datasource {
    export type Connection = ConnectionInternal.Connection;
    export type Parameters = ParametersInternal.Parameters;
    export type Record = RecordInternal.Record;
}

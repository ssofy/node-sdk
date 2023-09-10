import * as ItemInternal from './Item'
import * as ParametersInternal from './Criteria'
import * as ConnectionInternal from './Connection'
import * as MongooseConnectionInternal from './MongooseConnection'
import * as MongoDBConnectionInternal from './MongoDBConnection'
import * as MySQLPoolConnectionInternal from './MySQLPoolConnection'
import * as PGPoolConnectionInternal from './PGPoolConnection'
import * as DynamoDBConnectionInternal from './DynamoDBConnection'
import * as PrismaConnectionInternal from './PrismaConnection'
import * as SequelizeConnectionInternal from './SequelizeConnection'

export namespace Datasource {
    export type Criteria = ParametersInternal.Criteria;
    export type Item = ItemInternal.Item;
    export import Connection = ConnectionInternal.Connection;
    export import MongoDBConnection = MongoDBConnectionInternal.MongoDBConnection;
    export import MongooseConnection = MongooseConnectionInternal.MongooseConnection;
    export import DynamoDBConnection = DynamoDBConnectionInternal.DynamoDBConnection;
    export import PGPoolConnection = PGPoolConnectionInternal.PGPoolConnection;
    export import MySQLPoolConnection = MySQLPoolConnectionInternal.MySQLPoolConnection;
    export import PrismaConnection = PrismaConnectionInternal.PrismaConnection;
    export import SequelizeConnection = SequelizeConnectionInternal.SequelizeConnection;
}

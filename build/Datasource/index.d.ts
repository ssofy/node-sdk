import * as ItemInternal from './Item';
import * as ParametersInternal from './Criteria';
import * as ConnectionInternal from './Connection';
import * as MongooseConnectionInternal from './MongooseConnection';
import * as MongoDBConnectionInternal from './MongoDBConnection';
import * as MySQLConnectionInternal from './MySQLConnection';
import * as PGConnectionInternal from './PGConnection';
import * as DynamoDBConnectionInternal from './DynamoDBConnection';
import * as PrismaConnectionInternal from './PrismaConnection';
import * as SequelizeConnectionInternal from './SequelizeConnection';
export declare namespace Datasource {
    type Criteria = ParametersInternal.Criteria;
    type Item = ItemInternal.Item;
    export import Connection = ConnectionInternal.Connection;
    export import MongoDBConnection = MongoDBConnectionInternal.MongoDBConnection;
    export import MongooseConnection = MongooseConnectionInternal.MongooseConnection;
    export import DynamoDBConnection = DynamoDBConnectionInternal.DynamoDBConnection;
    export import PGConnectionConnection = PGConnectionInternal.PGConnection;
    export import MySQLPoolConnection = MySQLConnectionInternal.MySQLPoolConnection;
    export import PrismaConnection = PrismaConnectionInternal.PrismaConnection;
    export import SequelizeConnection = SequelizeConnectionInternal.SequelizeConnection;
}

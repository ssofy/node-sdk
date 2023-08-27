import { Datasource } from '.';
import { Connection } from './Connection';
import { Collection, Db } from 'mongodb';
export declare class MongoDBConnection extends Connection {
    protected db: Db;
    constructor(db: Db);
    protected getCollection(schema: string): Collection;
    query(schema: string, criteria: Datasource.Criteria): Promise<Datasource.Item[]>;
    insert(schema: string, item: Datasource.Item): Promise<Datasource.Item>;
    update(schema: string, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void>;
    upsert(schema: string, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void>;
    delete(schema: string, criteria: Datasource.Criteria): Promise<void>;
}

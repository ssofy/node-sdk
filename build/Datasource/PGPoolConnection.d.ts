import { Datasource } from '.';
import { Connection } from './Connection';
import { Pool } from 'pg';
export declare class PGPoolConnection extends Connection {
    protected pool: Pool;
    constructor(pool: Pool);
    query(schema: string, criteria: Datasource.Criteria): Promise<Datasource.Item[]>;
    insert(schema: string, item: Datasource.Item): Promise<Datasource.Item>;
    update(schema: string, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void>;
    upsert(schema: string, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void>;
    delete(schema: string, criteria: Datasource.Criteria): Promise<void>;
}

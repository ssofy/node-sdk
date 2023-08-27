import { Datasource } from '.';
import { Connection } from './Connection';
import { DynamoDB } from 'aws-sdk';
export declare class DynamoDBConnection extends Connection {
    protected client: DynamoDB.DocumentClient;
    constructor(client: DynamoDB.DocumentClient);
    query(schema: string, criteria: Datasource.Criteria): Promise<Datasource.Item[]>;
    insert(schema: string, item: Datasource.Item): Promise<Datasource.Item>;
    update(schema: string, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void>;
    upsert(schema: string, _criteria: Datasource.Criteria, item: Datasource.Item): Promise<void>;
    delete(schema: string, criteria: Datasource.Criteria): Promise<void>;
}

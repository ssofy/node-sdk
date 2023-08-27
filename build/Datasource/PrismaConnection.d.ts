import { Datasource } from ".";
import { Connection } from "./Connection";
import { PrismaClient } from '@prisma/client';
export declare class PrismaConnection extends Connection {
    protected client: PrismaClient;
    constructor(client: PrismaClient);
    query(schema: any, criteria: Datasource.Criteria): Promise<Datasource.Item[]>;
    insert(schema: any, row: Datasource.Criteria): Promise<Datasource.Item>;
    update(schema: any, criteria: Datasource.Criteria, row: Datasource.Item): Promise<void>;
    upsert(schema: any, criteria: Datasource.Criteria, row: Datasource.Item): Promise<void>;
    delete(schema: any, criteria: Datasource.Criteria): Promise<void>;
}

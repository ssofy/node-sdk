import { Datasource } from ".";
export declare abstract class Connection {
    abstract query(schema: any, criteria: Datasource.Criteria): Promise<Datasource.Item[]>;
    abstract insert(schema: any, item: Datasource.Item): Promise<Datasource.Item>;
    abstract update(schema: any, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void>;
    abstract upsert(schema: any, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void>;
    abstract delete(schema: any, criteria: Datasource.Criteria): Promise<void>;
}

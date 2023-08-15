import {Datasource} from ".";

export interface Connection {
    query(collection: any, criteria: Datasource.Parameters): Promise<Datasource.Record[]>;

    insert(collection: any, attributes: Datasource.Parameters): Promise<Datasource.Record>;

    update(collection: any, criteria: Datasource.Parameters, attributes: Datasource.Record): Promise<void>;

    upsert(collection: any, criteria: Datasource.Parameters, attributes: Datasource.Record): Promise<void>;

    delete(collection: any, criteria: Datasource.Parameters): Promise<void>;
}

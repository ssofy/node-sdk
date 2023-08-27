import { Datasource } from '.';
import { Connection } from './Connection';
import { Sequelize, Model, ModelStatic } from 'sequelize';
export declare class SequelizeConnection extends Connection {
    protected sequelize: Sequelize;
    constructor(sequelize: Sequelize);
    query(schema: ModelStatic<Model>, criteria: Datasource.Criteria): Promise<Datasource.Item[]>;
    insert(schema: ModelStatic<Model>, item: Datasource.Item): Promise<Datasource.Item>;
    update(schema: ModelStatic<Model>, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void>;
    upsert(schema: ModelStatic<Model>, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void>;
    delete(schema: ModelStatic<Model>, criteria: Datasource.Criteria): Promise<void>;
}

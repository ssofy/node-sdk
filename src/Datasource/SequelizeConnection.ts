import {Datasource} from '.';
import {Connection} from './Connection';
import {Sequelize, Model, ModelStatic, ModelAttributes} from 'sequelize';

export class SequelizeConnection extends Connection {
    protected sequelize: Sequelize;

    constructor(sequelize: Sequelize) {
        super();
        this.sequelize = sequelize;
    }

    async query(schema: ModelStatic<Model>, criteria: Datasource.Criteria): Promise<Datasource.Item[]> {
        return await schema.findAll({where: criteria});
    }

    async insert(schema: ModelStatic<Model>, item: Datasource.Item): Promise<Datasource.Item> {
        const result = await schema.create(item as ModelAttributes);
        return result.toJSON() as Datasource.Item;
    }

    async update(schema: ModelStatic<Model>, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void> {
        await schema.update(item, {where: criteria});
    }

    async upsert(schema: ModelStatic<Model>, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void> {
        await schema.upsert(item as ModelAttributes);
    }

    async delete(schema: ModelStatic<Model>, criteria: Datasource.Criteria): Promise<void> {
        await schema.destroy({where: criteria});
    }
}

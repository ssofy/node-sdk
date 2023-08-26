import {Datasource} from ".";
import {Connection} from "./Connection";
import mongoose from 'mongoose';

export class MongooseConnection extends Connection {
    async query(model: mongoose.Model<any, {}>, criteria: Datasource.Criteria): Promise<Datasource.Item[]> {
        return await model.find(criteria).exec();
    }

    async insert(model: mongoose.Model<any, {}>, item: Datasource.Item): Promise<Datasource.Item> {
        const instance = new model(item);
        return await instance.save();
    }

    async update(model: mongoose.Model<any, {}>, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void> {
        await model.updateOne(criteria, item).exec();
    }

    async upsert(model: mongoose.Model<any, {}>, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void> {
        await model.updateOne(criteria, item, {upsert: true}).exec();
    }

    async delete(model: mongoose.Model<any, {}>, criteria: Datasource.Criteria): Promise<void> {
        await model.deleteOne(criteria).exec();
    }
}

import { Datasource } from ".";
import { Connection } from "./Connection";
import mongoose from 'mongoose';
export declare class MongooseConnection extends Connection {
    query(model: mongoose.Model<any, {}>, criteria: Datasource.Criteria): Promise<Datasource.Item[]>;
    insert(model: mongoose.Model<any, {}>, item: Datasource.Item): Promise<Datasource.Item>;
    update(model: mongoose.Model<any, {}>, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void>;
    upsert(model: mongoose.Model<any, {}>, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void>;
    delete(model: mongoose.Model<any, {}>, criteria: Datasource.Criteria): Promise<void>;
}

import {Datasource} from '.';
import {Connection} from './Connection';
import {Collection, Db, InsertOneResult} from 'mongodb';

export class MongoDBConnection extends Connection {
    protected db: Db;

    constructor(db: Db) {
        super();
        this.db = db;
    }

    protected getCollection(schema: string): Collection {
        return this.db.collection(schema);
    }

    async query(schema: string, criteria: Datasource.Criteria): Promise<Datasource.Item[]> {
        const collection = this.getCollection(schema);
        return await collection.find(criteria).toArray();
    }

    async insert(schema: string, item: Datasource.Item): Promise<Datasource.Item> {
        const collection = this.getCollection(schema);
        const response: InsertOneResult<Datasource.Item> = await collection.insertOne(item);
        return {...item, _id: response.insertedId};
    }

    async update(schema: string, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void> {
        const collection = this.getCollection(schema);
        await collection.updateMany(criteria, {$set: item});
    }

    async upsert(schema: string, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void> {
        const collection = this.getCollection(schema);
        await collection.updateOne(criteria, {$set: item}, {upsert: true});
    }

    async delete(schema: string, criteria: Datasource.Criteria): Promise<void> {
        const collection = this.getCollection(schema);
        await collection.deleteMany(criteria);
    }
}

import {PrismaClient} from '@prisma/client';
import {Datasource} from ".";
import {Connection} from "./Connection";

export class PrismaConnection extends Connection {
    protected client: PrismaClient;

    constructor(client: PrismaClient) {
        super();
        this.client = client;
    }

    async query(schema: any, criteria: Datasource.Criteria): Promise<Datasource.Item[]> {
        return await this.client[schema].findMany({
            where: criteria,
        });
    }

    async insert(schema: any, row: Datasource.Criteria): Promise<Datasource.Item> {
        return await this.client[schema].create({
            data: row,
        });
    }

    async update(schema: any, criteria: Datasource.Criteria, row: Datasource.Item): Promise<void> {
        await this.client[schema].update({
            where: criteria,
            data: row,
        });
    }

    async upsert(schema: any, criteria: Datasource.Criteria, row: Datasource.Item): Promise<void> {
        await this.client[schema].upsert({
            where: criteria,
            create: row,
            update: row,
        });
    }

    async delete(schema: any, criteria: Datasource.Criteria): Promise<void> {
        await this.client[schema].delete({
            where: criteria,
        });
    }
}

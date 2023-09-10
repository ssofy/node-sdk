import {Datasource} from '.';
import {Connection} from './Connection';
import {Pool} from 'pg';

export class PGPoolConnection extends Connection {
    protected pool: Pool;

    constructor(pool: Pool) {
        super();
        this.pool = pool;
    }

    async query(schema: string, criteria: Datasource.Criteria): Promise<Datasource.Item[]> {
        const keys = Object.keys(criteria);
        const values = Object.values(criteria);
        const placeholders = keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');

        const {rows} = await this.pool.query(`SELECT *
                                              FROM ${schema}
                                              WHERE ${placeholders}`, values);
        return rows;
    }

    async insert(schema: string, item: Datasource.Item): Promise<Datasource.Item> {
        const keys = Object.keys(item);
        const values = Object.values(item);
        const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');

        const {rows} = await this.pool.query(
            `INSERT INTO ${schema} (${keys.join(', ')})
             VALUES (${placeholders}) RETURNING *`,
            values
        );
        return rows[0];
    }

    async update(schema: string, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void> {
        const updateKeys = Object.keys(item);
        const updateValues = Object.values(item);
        const updatePlaceholders = updateKeys.map((key, index) => `${key} = $${index + 1}`).join(', ');

        const criteriaKeys = Object.keys(criteria);
        const criteriaValues = Object.values(criteria);
        const criteriaPlaceholders = criteriaKeys.map((key, index) => `${key} = $${index + updateValues.length + 1}`).join(' AND ');

        await this.pool.query(
            `UPDATE ${schema}
             SET ${updatePlaceholders}
             WHERE ${criteriaPlaceholders}`,
            [...updateValues, ...criteriaValues]
        );
    }

    async upsert(schema: string, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void> {
        const keys = Object.keys(item);
        const values = Object.values(item);
        const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');
        const conflictKeys = Object.keys(criteria).join(', ');
        const updatePlaceholders = keys.map((key, index) => `${key} = EXCLUDED.${key}`).join(', ');

        await this.pool.query(
            `INSERT INTO ${schema} (${keys.join(', ')})
             VALUES (${placeholders}) ON CONFLICT(${conflictKeys}) DO
            UPDATE
                SET ${updatePlaceholders}`,
            values
        );
    }

    async delete(schema: string, criteria: Datasource.Criteria): Promise<void> {
        const keys = Object.keys(criteria);
        const values = Object.values(criteria);
        const placeholders = keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');

        await this.pool.query(`DELETE
                               FROM ${schema}
                               WHERE ${placeholders}`, values);
    }
}

import {Datasource} from '.';
import {Connection} from './Connection';
import {Pool} from 'mysql2/promise';

export class MySQLPoolConnection extends Connection {
    protected pool: Pool;

    constructor(pool: Pool) {
        super();
        this.pool = pool;
    }

    async query(schema: string, criteria: Datasource.Criteria): Promise<Datasource.Item[]> {
        const keys = Object.keys(criteria);
        const values = Object.values(criteria);
        const placeholders = keys.map(key => `${key} = ?`).join(' AND ');

        const [rows] = await this.pool.query(`SELECT *
                                              FROM ${schema}
                                              WHERE ${placeholders}`, values);
        return rows as Datasource.Item[];
    }

    async insert(schema: string, item: Datasource.Item): Promise<Datasource.Item> {
        const [result] = await this.pool.query(`INSERT INTO ${schema}
                                                SET ?`, item);
        if ('insertId' in result) {
            return {...item, id: result.insertId};
        }

        throw new Error('Insert operation did not return an insertId.');
    }


    async update(schema: string, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void> {
        const updateKeys = Object.keys(item);
        const updateValues = Object.values(item);
        const updatePlaceholders = updateKeys.map(key => `${key} = ?`).join(', ');

        const criteriaKeys = Object.keys(criteria);
        const criteriaValues = Object.values(criteria);
        const criteriaPlaceholders = criteriaKeys.map(key => `${key} = ?`).join(' AND ');

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
        const placeholders = keys.map(() => `?`).join(', ');
        const updatePlaceholders = keys.map(key => `${key} = VALUES(${key})`).join(', ');

        await this.pool.query(
            `INSERT INTO ${schema} (${keys.join(', ')})
             VALUES (${placeholders}) ON DUPLICATE KEY
            UPDATE ${updatePlaceholders}`,
            [...values, ...values]
        );
    }

    async delete(schema: string, criteria: Datasource.Criteria): Promise<void> {
        const keys = Object.keys(criteria);
        const values = Object.values(criteria);
        const placeholders = keys.map(key => `${key} = ?`).join(' AND ');

        await this.pool.query(`DELETE
                               FROM ${schema}
                               WHERE ${placeholders}`, values);
    }
}

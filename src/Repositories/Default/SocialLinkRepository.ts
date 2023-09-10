import {Repositories} from "..";
import {Datasource} from "../../Datasource";

export class SocialLinkRepository implements Repositories.SocialLinkRepository {
    protected connection: Datasource.Connection;
    protected schema: any;
    protected columns: { [key: string]: string };

    constructor(connection: Datasource.Connection, schema: any, columnMap: { [key: string]: string } = {}) {
        this.connection = connection;
        this.schema = schema;
        this.columns = columnMap;
    }

    async getUserId(provider: string, identifier: string): Promise<string | null> {
        let criteria: Datasource.Criteria = {};
        this.objectSet(criteria, 'provider', provider);
        this.objectSet(criteria, 'identifier', identifier);

        const links = await this.connection.query(this.schema, criteria);
        if (links.length <= 0) {
            return null;
        }

        return this.objectGet(links[0], 'user_id');
    }

    link(provider: string, identifier: string, userId: string): Promise<void> {
        const item: Datasource.Item = {};
        this.objectSet(item, 'provider', provider);
        this.objectSet(item, 'identifier', identifier);
        this.objectSet(item, 'user_id', userId);

        let criteria: Datasource.Criteria = {};
        this.objectSet(criteria, 'provider', provider);
        this.objectSet(criteria, 'identifier', identifier);
        this.objectSet(criteria, 'user_id', userId);

        return this.connection.upsert(this.schema, criteria, item);
    }

    protected objectGet(obj: any, column: string, alternative?: any): any {
        const realColumn = this.column(column);

        if (!obj.hasOwnProperty(realColumn)) {
            return alternative;
        }

        return obj[realColumn] ?? alternative;
    }

    protected objectSet(obj: any, column: string, value: any): void {
        obj[this.column(column)] = value;
    }

    protected column(column: string): string {
        return this.columns[column] ?? column;
    }
}

import {Repositories} from "..";
import {Datasource} from "../../Datasource";

export class SocialLinkRepository implements Repositories.SocialLinkRepository {
    protected connection: Datasource.Connection;
    protected schema: any;
    protected columns: { [key: string]: string };

    constructor(connection: Datasource.Connection, schema: any, columnMap: { [key: string]: string }) {
        this.connection = connection;
        this.schema = schema;
        this.columns = columnMap;
    }

    async getUserId(provider: string, identifier: string): Promise<string | null> {
        let criteria: Datasource.Criteria = {};
        criteria[this.columns.provider ?? 'provider'] = provider;
        criteria[this.columns.identifier ?? 'identifier'] = identifier;

        const links = await this.connection.query(this.schema, criteria);
        if (links.length <= 0) {
            return null;
        }

        return links[0][this.columns.user_id ?? 'user_id'];
    }

    link(provider: string, identifier: string, userId: string): Promise<void> {
        const item: Datasource.Item = {};
        item[this.columns.provider ?? 'provider'] = provider;
        item[this.columns.identifier ?? 'identifier'] = identifier;
        item[this.columns.user_id ?? 'user_id'] = userId;

        let criteria: Datasource.Criteria = {};
        criteria[this.columns.provider ?? 'provider'] = provider;
        criteria[this.columns.identifier ?? 'identifier'] = identifier;
        criteria[this.columns.user_id ?? 'user_id'] = userId;

        return this.connection.upsert(this.schema, criteria, item);
    }
}

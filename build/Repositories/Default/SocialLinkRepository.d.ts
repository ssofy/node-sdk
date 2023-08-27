import { Repositories } from "..";
import { Datasource } from "../../Datasource";
export declare class SocialLinkRepository implements Repositories.SocialLinkRepository {
    protected connection: Datasource.Connection;
    protected schema: any;
    protected columns: {
        [key: string]: string;
    };
    constructor(connection: Datasource.Connection, schema: any, columnMap?: {
        [key: string]: string;
    });
    getUserId(provider: string, identifier: string): Promise<string | null>;
    link(provider: string, identifier: string, userId: string): Promise<void>;
}

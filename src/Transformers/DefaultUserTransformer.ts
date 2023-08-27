import {Transformers} from ".";
import {Models} from '../Models'

export class DefaultUserTransformer implements Transformers.UserTransformer {
    protected columns: { [key: string]: string };
    protected additionalColumns: string[];

    constructor(columnMap: { [key: string]: string } = {}, additionalColumns: string[] = []) {
        this.columns = columnMap;
        this.additionalColumns = additionalColumns;
    }

    async transform(user: any): Promise<Models.UserEntity> {
        let metadata = this.get(user, 'metadata', {});

        if (typeof metadata === 'string') {
            metadata = JSON.parse(metadata) ?? {};
        }

        return {
            ...metadata,
            id: this.get(user, 'id', '').toString(),
            hash: this.get(user, 'hash', '').toString(),
            name: this.get(user, 'name'),
            display_name: this.get(user, 'display_name'),
            picture: this.get(user, 'picture'),
            username: this.get(user, 'username'),
            email: this.get(user, 'email'),
            email_verified: !!this.get(user, 'email_verified_at'),
            phone: this.get(user, 'phone'),
            phone_verified: !!this.get(user, 'phone_verified_at'),
            additional: this.additionalColumns.reduce((obj, key) => ({...obj, [key]: user[key]}), {}),
        };
    }

    private get(user: any, column: string, defaultVal: any = null): any {
        const mappedColumn = this.columns[column];

        if ((!mappedColumn || mappedColumn.trim() === '') && !user[column]) {
            return defaultVal;
        }

        return user[mappedColumn ?? column] ?? defaultVal;
    }
}

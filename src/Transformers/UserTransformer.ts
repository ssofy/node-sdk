import {Transformers} from ".";
import {Models} from '../Models'

export class UserTransformer implements Transformers.Transformer {
    protected columns: { [key: string]: string };
    protected additionalColumns: string[];

    constructor(columnMap: { [key: string]: string } = {}, additionalColumns: string[] = []) {
        this.columns = columnMap;
        this.additionalColumns = additionalColumns;
    }

    async transform(data: any): Promise<Models.UserEntity> {
        let metadata = this.get(data, 'metadata', {});

        if (typeof metadata === 'string') {
            metadata = JSON.parse(metadata) ?? {};
        }

        return {
            ...metadata,
            id: this.get(data, 'id', '').toString(),
            hash: this.get(data, 'hash', '').toString(),
            name: this.get(data, 'name'),
            display_name: this.get(data, 'display_name'),
            picture: this.get(data, 'picture'),
            username: this.get(data, 'username'),
            email: this.get(data, 'email'),
            email_verified: !!this.get(data, 'email_verified_at'),
            phone: this.get(data, 'phone'),
            phone_verified: !!this.get(data, 'phone_verified_at'),
            additional: this.additionalColumns.reduce((obj, key) => ({...obj, [key]: data[key]}), {}),
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

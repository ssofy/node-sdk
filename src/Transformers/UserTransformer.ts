import {Transformers} from ".";
import {Models} from '../Models'

export class UserTransformer implements Transformers.Transformer {
    protected columns: { [key: string]: string };

    constructor(columnMap: { [key: string]: string }) {
        this.columns = columnMap;
    }

    async transform(user: any): Promise<Models.UserEntity> {
        let metadata = this.get(user, 'metadata', {});

        if (typeof metadata === 'string') {
            metadata = JSON.parse(metadata) ?? {};
        }

        const additional = Object.keys(user)
            .filter(key => key !== this.columns.metadata)
            .reduce((obj, key) => ({...obj, [key]: user[key]}), {});

        return {
            ...metadata,
            id: this.get(user, 'id').toString(),
            hash: this.get(user, 'hash').toString(),
            name: this.get(user, 'name'),
            display_name: this.get(user, 'display_name'),
            picture: this.get(user, 'picture'),
            username: this.get(user, 'username'),
            email: this.get(user, 'email'),
            email_verified: !!this.get(user, 'email_verified_at'),
            phone: this.get(user, 'phone'),
            phone_verified: !!this.get(user, 'phone_verified_at'),
            additional
        };
    }

    private get(user: any, column: string, defaultVal: any = null): any {
        const mappedColumn = this.columns[column];
        if (!mappedColumn || mappedColumn.trim() === '') {
            return defaultVal;
        }
        return user[mappedColumn] ?? defaultVal;
    }
}

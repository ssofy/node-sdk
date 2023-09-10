import {Repositories} from "..";
import {Models} from "../../Models";
import {Datasource} from "../../Datasource";
import {Transformers} from "../../Transformers";
import {Helpers} from "../../helpers";
import {Storage} from "@ssofy/javascript-sdk";
import * as crypto from 'crypto';

export class UserRepository implements Repositories.UserRepository {
    protected connection: Datasource.Connection;
    protected schema: any;
    protected tokenStorage: Storage;
    protected socialLinkRepository: Repositories.SocialLinkRepository;
    protected userTransformer: Transformers.UserTransformer;
    protected columns: { [key: string]: string };

    constructor(connection: Datasource.Connection,
                schema: any,
                tokenStorage: Storage,
                socialLinkRepository: Repositories.SocialLinkRepository,
                userTransformer: Transformers.UserTransformer,
                columnMap: { [key: string]: string } = {}
    ) {
        this.connection = connection;
        this.schema = schema;
        this.tokenStorage = tokenStorage;
        this.socialLinkRepository = socialLinkRepository;
        this.userTransformer = userTransformer;
        this.columns = columnMap;
    }

    async find(field: string, value: string, ip?: string): Promise<Models.UserEntity | null> {
        let criteria: Datasource.Criteria = {};
        this.objectSet(criteria, field, value);

        const users = await this.connection.query(this.schema, criteria);
        if (users.length <= 0) {
            return null;
        }

        return this.userTransformer.transform(users[0]);
    }

    async findById(id: string, ip?: string): Promise<Models.UserEntity | null> {
        let criteria: Datasource.Criteria = {};
        this.objectSet(criteria, 'id', id);

        const users = await this.connection.query(this.schema, criteria);
        if (users.length <= 0) {
            return null;
        }

        return this.userTransformer.transform(users[0]);
    }

    async findByToken(token: string, ip?: string): Promise<Models.UserEntity | null> {
        const key: string = this.tokenStorageKey(token);
        const userId: string | null = await this.tokenStorage.get(key);
        if (userId === null) {
            return null;
        }

        return this.findById(userId);
    }

    async findBySocialLinkOrCreate(provider: string, user: Models.UserEntity, ip?: string): Promise<Models.UserEntity> {
        const userId: string | null = await this.socialLinkRepository.getUserId(provider, user.id);
        if (userId) {
            const found: Models.UserEntity | null = await this.findById(userId, ip);
            if (found) {
                return found;
            }
        }

        const created: Models.UserEntity = await this.findByEmailOrCreate(user, undefined, ip);

        await this.socialLinkRepository.link(provider, user.id, created.id);

        return created;
    }

    async findByEmailOrCreate(user: Models.UserEntity, password?: string, ip?: string): Promise<Models.UserEntity> {
        const existingUser: Models.UserEntity | null = await this.find('email', user.email ?? '', ip);
        if (existingUser) {
            return existingUser;
        }

        if (user.name?.trim() === '') {
            user.name = user.email?.split('@')[0];
        }

        return this.create(user, password, ip);
    }

    async create(user: Models.UserEntity, password?: string, ip?: string): Promise<Models.UserEntity> {
        const userAttributes = <any>user;

        this.objectDelete(userAttributes, 'id');

        if (!password) {
            password = Helpers.randomString(16);
        }

        this.objectSet(userAttributes, 'password', this.makePassword(password));

        const item = this.makeUserItem(userAttributes);
        await this.connection.insert(this.schema, item);

        return this.userTransformer.transform(item);
    }

    async update(user: Models.UserEntity, ip?: string): Promise<Models.UserEntity> {
        const userAttributes: any = user;

        let criteria: Datasource.Criteria = {};
        this.objectSet(criteria, 'id', user.id);

        let item = this.makeUserItem(userAttributes);
        this.objectDelete(item, 'id');

        await this.connection.update(this.schema, criteria, item);

        return this.userTransformer.transform(item);
    }

    async createToken(userId: string, ttl?: number): Promise<Models.TokenEntity> {
        const token: string = Helpers.randomString(32);

        await this.tokenStorage.put(this.tokenStorageKey(token), userId, ttl);

        return {
            token: token,
            ttl: ttl ?? 60,
        };
    }

    async deleteToken(token: string): Promise<void> {
        return this.tokenStorage.delete(this.tokenStorageKey(token));
    }

    async verifyPassword(userId: string, password?: string, ip?: string): Promise<boolean> {
        let criteria: Datasource.Criteria = {};
        this.objectSet(criteria, 'id', userId);

        const users = await this.connection.query(this.schema, criteria);
        if (users.length <= 0) {
            return false;
        }

        const user = users[0];

        if (!password) {
            return this.objectGet(user, 'password') === null;
        }

        return this.objectGet(user, 'password') === this.makePassword(password);
    }

    async updatePassword(userId: string, password: string, ip?: string): Promise<void> {
        let criteria: Datasource.Criteria = {};
        this.objectSet(criteria, 'id', userId);

        let item: Datasource.Item = {};
        this.objectSet(item, 'password', this.makePassword(password));

        return this.connection.update(this.schema, criteria, item);
    }

    protected makeUserItem(userAttributes: any): Datasource.Item {
        if (this.objectGet(userAttributes, 'name', '').trim() === '') {
            this.objectSet(userAttributes, 'name', (this.objectGet(userAttributes, 'given_name', '').trim() + ' ' + this.objectGet(userAttributes, 'family_name', '')).trim());
        }

        let item: Datasource.Item = Object.keys(userAttributes).reduce((acc: Datasource.Item, key: string) => {
            if (this.columns[key]) {
                this.objectSet(acc, key, userAttributes[key]);
            }
            return acc;
        }, {} as Datasource.Item);

        if (this.columns.metadata) {
            this.objectSet(item, 'metadata', userAttributes);
            this.objectDelete(this.objectGet(item, 'metadata'), 'password');
        }

        return item;
    }

    protected makePassword(password: string): string {
        const hash = crypto.createHash('sha256');
        hash.update(password);
        return hash.digest('hex');
    }

    protected tokenStorageKey(token: string): string {
        return `user:token:${token}`;
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

    protected objectDelete(obj: any, column: string): void {
        delete obj[this.column(column)];
    }

    protected column(column: string): string {
        return this.columns[column] ?? column;
    }
}

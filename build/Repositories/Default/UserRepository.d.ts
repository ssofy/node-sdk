import { Repositories } from "..";
import { Models } from "../../Models";
import { Datasource } from "../../Datasource";
import { Transformers } from "../../Transformers";
import { Storage } from "@ssofy/javascript-sdk";
export declare class UserRepository implements Repositories.UserRepository {
    protected connection: Datasource.Connection;
    protected schema: any;
    protected tokenStorage: Storage;
    protected socialLinkRepository: Repositories.SocialLinkRepository;
    protected userTransformer: Transformers.UserTransformer;
    protected columns: {
        [key: string]: string;
    };
    constructor(connection: Datasource.Connection, schema: any, tokenStorage: Storage, socialLinkRepository: Repositories.SocialLinkRepository, userTransformer: Transformers.UserTransformer, columnMap?: {
        [key: string]: string;
    });
    find(field: string, value: string, ip?: string): Promise<Models.UserEntity | null>;
    findById(id: string, ip?: string): Promise<Models.UserEntity | null>;
    findByToken(token: string, ip?: string): Promise<Models.UserEntity | null>;
    findBySocialLinkOrCreate(provider: string, user: Models.UserEntity, ip?: string): Promise<Models.UserEntity>;
    findByEmailOrCreate(user: Models.UserEntity, password?: string, ip?: string): Promise<Models.UserEntity>;
    create(user: Models.UserEntity, password?: string, ip?: string): Promise<Models.UserEntity>;
    update(user: Models.UserEntity, ip?: string): Promise<Models.UserEntity>;
    createToken(userId: string, ttl?: number): Promise<Models.TokenEntity>;
    deleteToken(token: string): Promise<void>;
    verifyPassword(userId: string, password?: string, ip?: string): Promise<boolean>;
    updatePassword(userId: string, password: string, ip?: string): Promise<void>;
    protected makeUserItem(userAttributes: any): Datasource.Item;
    protected makePassword(password: string): string;
    protected tokenStorageKey(token: string): string;
}

import { Repositories } from "..";
import { Models } from "../../Models";
export declare class UserRepository implements Repositories.UserRepository {
    create(user: Models.UserEntity, password?: string, ip?: string): Promise<Models.UserEntity>;
    createToken(userId: string, ttl?: number): Promise<Models.TokenEntity>;
    deleteToken(token: string): Promise<void>;
    find(field: string, value: string, ip?: string): Promise<Models.UserEntity | null>;
    findByEmailOrCreate(user: Models.UserEntity, password?: string, ip?: string): Promise<Models.UserEntity>;
    findById(id: string, ip?: string): Promise<Models.UserEntity | null>;
    findBySocialLinkOrCreate(provider: string, user: Models.UserEntity, ip?: string): Promise<Models.UserEntity>;
    findByToken(token: string, ip?: string): Promise<Models.UserEntity | null>;
    update(user: Models.UserEntity, ip?: string): Promise<Models.UserEntity>;
    updatePassword(userId: string, password: string, ip?: string): Promise<void>;
    verifyPassword(userId: string, password?: string, ip?: string): Promise<boolean>;
    private sampleUser;
}

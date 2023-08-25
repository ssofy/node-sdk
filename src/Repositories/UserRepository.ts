import {Models} from "../Models";

export interface UserRepository {
    /**
     * Find user by credentials such as email, phone, etc.
     */
    find(field: string, value: string, ip?: string): Promise<Models.UserEntity | null>;

    /**
     * Find user by id.
     */
    findById(id: string, ip?: string): Promise<Models.UserEntity | null>;

    /**
     * Find user by token.
     */
    findByToken(token: string, ip?: string): Promise<Models.UserEntity | null>;

    /**
     * Find user by social provided user.
     */
    findBySocialLinkOrCreate(provider: string, user: Models.UserEntity, ip?: string): Promise<Models.UserEntity>;

    /**
     * Find or create user by email.
     */
    findByEmailOrCreate(user: Models.UserEntity, password?: string, ip?: string): Promise<Models.UserEntity>;

    /**
     * Create a user.
     */
    create(user: Models.UserEntity, password?: string, ip?: string): Promise<Models.UserEntity>;

    /**
     * Update a user.
     */
    update(user: Models.UserEntity, ip?: string): Promise<Models.UserEntity>;

    /**
     * Generate and store a new token for token-based authentication.
     * Returns the generated token.
     */
    createToken(userId: string, ttl?: number): Promise<Models.TokenEntity>;

    /**
     * Expire a token.
     */
    deleteToken(token: string): Promise<void>;

    /**
     * Verify user's password.
     */
    verifyPassword(userId: string, password?: string, ip?: string): Promise<boolean>;

    /**
     * Update user's password.
     */
    updatePassword(userId: string, password: string, ip?: string): Promise<void>;
}

import { UserEntity } from "../Models/Entities/UserEntity";
export interface UserRepository {
    /**
     * Find user by credentials such as email, phone, etc.
     */
    find(field: string, value: string, ip?: string): UserEntity | null;
    /**
     * Find user by id.
     */
    findById(id: string, ip?: string): UserEntity | null;
    /**
     * Find user by token.
     */
    findByToken(token: string, ip?: string): UserEntity | null;
    /**
     * Find user by social provided user.
     */
    findBySocialLinkOrCreate(provider: string, user: UserEntity, ip?: string): UserEntity | null;
    /**
     * Find or create user by email.
     */
    findByEmailOrCreate(user: UserEntity, password?: string, ip?: string): UserEntity | null;
    /**
     * Create a user.
     */
    create(user: UserEntity, password?: string, ip?: string): UserEntity | null;
    /**
     * Update a user.
     */
    update(user: UserEntity, ip?: string): UserEntity | null;
    /**
     * Generate and store a new token for token-based authentication.
     * Returns the generated token.
     */
    createToken(userId: string, ttl?: number): UserEntity | null;
    /**
     * Expire a token.
     */
    deleteToken(token: string): void;
    /**
     * Verify user's password.
     */
    verifyPassword(userId: string, password?: string, ip?: string): boolean;
    /**
     * Update user's password.
     */
    updatePassword(userId: string, password: string, ip?: string): void;
}
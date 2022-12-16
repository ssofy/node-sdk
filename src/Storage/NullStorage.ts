import {Storage} from "./Storage";

export class NullStorage implements Storage {
    async cleanup(): Promise<void> {
    }

    async delete(key: string): Promise<void> {
    }

    async flushAll(): Promise<void> {
    }

    async get(key: string): Promise<string | null> {
        return null;
    }

    async put(key: string, value: string, ttl?: number): Promise<void> {
    }
}
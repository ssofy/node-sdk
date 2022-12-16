import { Storage } from "./Storage";
export declare class NullStorage implements Storage {
    cleanup(): Promise<void>;
    delete(key: string): Promise<void>;
    flushAll(): Promise<void>;
    get(key: string): Promise<string | null>;
    put(key: string, value: string, ttl?: number): Promise<void>;
}

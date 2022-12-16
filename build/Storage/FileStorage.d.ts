import { Storage } from "./Storage";
export declare class FileStorage implements Storage {
    private readonly storagePath;
    private readonly glob;
    constructor(storagePath: string);
    put(key: string, value: string, ttl?: number): Promise<void>;
    get(key: string): Promise<string | null>;
    delete(key: string): Promise<void>;
    flushAll(): Promise<void>;
    cleanup(): Promise<void>;
    private getFilename;
}

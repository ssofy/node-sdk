import {Storage} from "./Storage";
import {promisify} from "util";
import {promises as fs} from 'fs';
import {glob as _glob} from "glob";
import path from "path";

export class FileStorage implements Storage {
    private readonly storagePath: string;

    private readonly glob: any;

    constructor(storagePath: string) {
        this.storagePath = storagePath;
        this.glob = promisify(_glob);
    }

    async put(key: string, value: string, ttl?: number): Promise<void> {
        await fs.writeFile(this.getFilename(key) + `.${ttl || 0}`, value);
    }

    async get(key: string): Promise<string | null> {
        const files = await this.glob(this.getFilename(key) + '*');

        if (files.length <= 0) {
            return null;
        }

        const filename = files[0];

        const ttl = Number.parseInt(filename.substring(filename.indexOf('.') + 1));

        if (ttl > 0 && (new Date()).getTime() / 1000 >= (new Date((await fs.stat(filename)).mtime).getTime() / 1000) + ttl) {
            await this.delete(key);
            return null;
        }

        const result = await fs.readFile(filename);

        return result.toString();
    }

    async delete(key: string): Promise<void> {
        const files = await this.glob(this.getFilename(key) + '*');

        for (const filename of files) {
            await fs.rm(filename);
        }
    }

    async flushAll(): Promise<void> {
        const files = await this.glob(path.join(this.storagePath, '*.*'));

        for (const filename of files) {
            await fs.rm(filename);
        }
    }

    async cleanup(): Promise<void> {
        (await fs.readdir(this.storagePath)).map(async filename => {
            if (filename.startsWith('.')) {
                return;
            }

            const ttl = Number.parseInt(filename.substring(filename.indexOf('.') + 1));

            filename = path.join(this.storagePath, filename);

            if (ttl > 0 && (new Date()).getTime() / 1000 >= (new Date((await fs.stat(filename)).mtime).getTime() / 1000) + ttl) {
                await fs.rm(filename);
            }
        });
    }

    private getFilename(key: string) {
        return path.join(this.storagePath, key.replace(/\//g, ':'));
    }
}
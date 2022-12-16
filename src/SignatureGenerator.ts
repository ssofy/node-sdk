import {Signature} from "./Models/Signature";
import * as crypto from "crypto";
import {ClientConfig} from "./ClientConfig";

export class SignatureGenerator {
    private readonly key: string;
    private readonly secret: string;

    constructor(config: ClientConfig) {
        this.key = config.key;
        this.secret = config.secret;
    }

    async generate(url: string, params: any, salt?: string): Promise<Signature> {
        try {
            const path = (new URL(url)).pathname;

            const toSign = path + this.getValues(params).join('') + this.key + this.secret + (salt || '');

            const hash = await this.sha256(toSign);

            return <Signature>{
                hash: hash,
                salt: salt
            };

        } catch (e) {
            return <Signature>{};
        }
    }

    private getValues(obj: any, values: any = []): any {
        obj = (Object.keys(obj) as Array<keyof typeof obj>)
            .sort().reduce((r: any, k: any) => (r[k] = obj[k], r), {});

        for (let key in obj) {
            const value = obj[key];
            if (value instanceof Array || (typeof value === 'object' && value !== null)) {
                values = this.getValues(value, values);
                continue;
            }

            if (typeof value == 'boolean') {
                values.push(value ? '1' : '0');
                continue;
            }

            values.push(value ? value.toString() : '');
        }

        return values;
    }

    private async sha256(message: string) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
}
import {Models} from "./Models";
import crypto from 'crypto';

export class SignatureGenerator {
    async generate(url: string, params: any, secret: string, salt?: string): Promise<Models.Signature> {
        const path = (new URL(url)).pathname;

        const toSign = path + this.getValues(params).join('') + (salt || '');

        const hash = await this.hmac(toSign, secret);

        return <Models.Signature>{
            hash: hash,
            salt: salt
        };
    }

    private getValues(obj: any): any {
        let values = [];

        let flatten = (Object.keys(obj) as Array<keyof typeof obj>)
            .sort().reduce((r: any, k: any) => (r[k] = obj[k], r), {});

        for (let key in flatten) {
            const value = flatten[key];

            if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
                values.push(...this.getValues(value));
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

    private async hmac(message: string, secret: string) {
        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(message);
        return hmac.digest('hex');
    }
}

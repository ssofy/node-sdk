import { Models } from "./Models";
export declare class SignatureGenerator {
    generate(url: string, params: any, secret: string, salt?: string): Promise<Models.Signature>;
    private getValues;
    private hmac;
}

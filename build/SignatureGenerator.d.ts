import { Signature } from "./Models/Signature";
export declare class SignatureGenerator {
    generate(url: string, params: any, secret: string, salt?: string): Promise<Signature>;
    private getValues;
    private hmac;
}

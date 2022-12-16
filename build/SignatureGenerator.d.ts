import { Signature } from "./Models/Signature";
import { ClientConfig } from "./ClientConfig";
export declare class SignatureGenerator {
    private readonly key;
    private readonly secret;
    constructor(config: ClientConfig);
    generate(url: string, params: any, salt?: string): Promise<Signature>;
    private getValues;
    private sha256;
}

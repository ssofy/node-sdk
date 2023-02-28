import { ClientConfig } from ".";
export declare class SignatureValidator {
    private config;
    private signatureGenerator;
    constructor(config: ClientConfig);
    verifyBase64Signature(url: string, params: any, signature: string): Promise<boolean>;
}

import { APIConfig } from ".";
export declare class SignatureValidator {
    private config;
    private signatureGenerator;
    constructor(config: APIConfig);
    verifyBase64Signature(url: string, params: any, signature: string): Promise<boolean>;
}

import { ClientConfig } from ".";
export declare class SignatureValidator {
    private signatureGenerator;
    constructor(config: ClientConfig);
    verifyBase64Signature(url: string, params: any, signature: string): Promise<boolean>;
}

import { SignatureGenerator } from "./SignatureGenerator";
export declare class SignatureVerifier {
    private signatureGenerator;
    constructor(generator: SignatureGenerator);
    verifyBase64Signature(url: string, params: any, secret: string, signature: string): Promise<boolean>;
}

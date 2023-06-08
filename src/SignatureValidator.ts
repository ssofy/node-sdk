import {APIConfig, SignatureGenerator} from ".";
import {Signature} from "./Models/Signature";

export class SignatureValidator {
    private config: APIConfig;
    private signatureGenerator: SignatureGenerator;

    constructor(config: APIConfig) {
        this.config = config;
        this.signatureGenerator = new SignatureGenerator();
    }

    async verifyBase64Signature(url: string, params: any, signature: string) {
        try {
            const decodedSignature = <Signature>(JSON.parse(Buffer.from(signature, 'base64').toString('utf8')));
            const generatedSignature = await this.signatureGenerator.generate(url, params, this.config.secret, decodedSignature.salt);
            return generatedSignature.hash === decodedSignature.hash;
        } catch (e) {
            return false;
        }
    }
}
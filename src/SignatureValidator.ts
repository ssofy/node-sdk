import {ClientConfig, SignatureGenerator} from ".";
import {Signature} from "./Models/Signature";

export class SignatureValidator {
    private signatureGenerator: SignatureGenerator;

    constructor(config: ClientConfig) {
        this.signatureGenerator = new SignatureGenerator(config);
    }

    async verifyBase64Signature(url: string, params: any, signature: string) {
        try {
            const decodedSignature = <Signature>(JSON.parse(Buffer.from(signature, 'base64').toString('utf8')));
            const generatedSignature = await this.signatureGenerator.generate(url, params, decodedSignature.salt);
            return generatedSignature.hash === decodedSignature.hash;
        } catch (e) {
            return false;
        }
    }
}
import {SignatureGenerator} from "./SignatureGenerator";
import {Models} from "./Models";

export class SignatureVerifier {
    private signatureGenerator: SignatureGenerator;

    constructor(generator: SignatureGenerator) {
        this.signatureGenerator = generator;
    }

    async verifyBase64Signature(url: string, params: any, secret: string, signature: string) {
        try {
            const decodedSignature = <Models.Signature>(JSON.parse(Buffer.from(signature, 'base64').toString('utf8')));
            const generatedSignature = await this.signatureGenerator.generate(url, params, secret, decodedSignature.salt);
            return generatedSignature.hash === decodedSignature.hash;
        } catch (e) {
            return false;
        }
    }
}

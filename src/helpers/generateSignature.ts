import randomString from "./randomString";
import {SignatureGenerator} from "../SignatureGenerator";

export default async (secret: string, path: string, data: any): Promise<string> => {
    const signatureGenerator = new SignatureGenerator();
    const salt = randomString(Math.floor(Math.random() * (32 - 16 + 1)) + 16);

    path = path.startsWith('/') ? 'http://localhost' + path : path;

    const signatureValue = await signatureGenerator.generate(path, data, secret, salt);

    return Buffer.from(JSON.stringify(signatureValue)).toString('base64');
};

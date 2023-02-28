import axios, {AxiosError} from 'axios';
import {ClientConfig} from "./ClientConfig";
import {Storage} from "./Storage/Storage";
import {NullStorage} from "./Storage/NullStorage";
import {InvalidTokenError} from "./Errors/InvalidTokenError";
import {SignatureGenerator} from "./SignatureGenerator";
import {SignatureVerificationError} from "./Errors/SignatureVerificationError";
import {APIError} from "./Errors/APIError";
import {Token} from "./Models/Token";
import {APIResponse} from "./Models/APIResponse";
import {UserEntity} from "./Models/Entities/UserEntity";
import {SignatureValidator} from "./SignatureValidator";

export class Client {
    private config: ClientConfig;

    private readonly cache: Storage;

    private readonly signatureGenerator: SignatureGenerator;

    constructor(config: ClientConfig) {
        this.config = config;

        this.config.cacheTtl = config.cacheTtl || 60 * 60 * 3;
        this.config.secure = config.secure || false;

        if (!config.cacheStore) {
            this.cache = new NullStorage();
        } else {
            this.cache = config.cacheStore;
        }

        this.signatureGenerator = new SignatureGenerator();
    }

    async verifyAuthentication(token: string): Promise<APIResponse> {
        const path = 'v1/authenticated/verify';

        const response = await this.requestAndCache(path, this.sanitizeToken(token));

        return <APIResponse>{
            token: this.forceCast<Token>(response.token)
        };
    }

    async authenticatedUser(token: string, cache: boolean = false): Promise<APIResponse> {
        const path = 'v1/authenticated/user';

        const response = await this.requestAndCache(path, this.sanitizeToken(token), {}, cache);

        return <APIResponse>{
            user: this.forceCast<UserEntity>(response.user),
            token: this.forceCast<Token>(response.token)
        };
    }

    async findUserById(id: string, cache: boolean = false): Promise<APIResponse> {
        const path = `v1/entities/users/find`;

        const response = await this.requestAndCache(path, undefined, {
            id: id,
        }, cache);

        return <APIResponse>{
            user: this.forceCast<UserEntity>(response.user)
        };
    }

    async invalidateTokenCache(token: string): Promise<void> {
        await this.cache.delete(`v1/authenticated/verify:${token}`);
        await this.cache.delete(`v1/authenticated/user:${token}`);
    }

    async purgeTokenCache(): Promise<void> {
        await this.cache.flushAll();
    }

    private async requestAndCache(path: string, token?: string, fields: any = {}, cache: boolean = true): Promise<any> {
        const cacheKey = `request:{path}:{token}`;

        if (cache) {
            // try the cache first
            const cached = await this.cache.get(cacheKey);
            if (cached) {
                if (cached === '') {
                    throw new InvalidTokenError();
                }

                return JSON.parse(cached);
            }
            //
        }

        try {
            if (token) {
                fields['bearer'] = token;
            }

            const response = await this.request(path, fields, true);

            const body = response.body;
            const headers = response.headers;

            const signatureValidator = new SignatureValidator(this.config);
            const url = new URL(path, 'http://localhost');
            if (!headers.signature || !await signatureValidator.verifyBase64Signature(url.href, body, headers.signature)) {
                throw new SignatureVerificationError();
            }

            if (cache) {
                let ttl = 0;

                if (body.token) {
                    ttl = ((new Date(body.token.expires_at)).getTime() - (new Date()).getTime()) / 1000;
                    ttl = Math.max(1, ttl); // token ttl should not be eternal
                }

                await this.cache.put(cacheKey, body.toString(), Math.min(ttl, this.config.cacheTtl || 0));
            }

            return body;
        } catch (e) {
            if (e instanceof InvalidTokenError) {
                if (cache) {
                    // cache the failure result to avoid repetitive requests to server
                    await this.cache.put(cacheKey, '', this.config.cacheTtl);
                }
            }

            throw e;
        }
    }

    private async request(path: string = '/', fields: Object = {}, post: boolean = false): Promise<any> {
        const protocol = this.config.secure ? 'https://' : 'http://';

        const url = new URL(path, protocol + this.config.domain);

        const saltLength = Math.floor(Math.random() * (9 - 6 + 1)) + 6;
        const salt = Math.random().toString(36).substring(2, saltLength + 2);

        const signature = Buffer.from(
            JSON.stringify(await this.signatureGenerator.generate(url.href, fields, this.config.secret, salt)),
            'utf8'
        ).toString('base64');

        try {
            const response = await axios({
                method: post ? 'post' : 'get',
                url: new URL(path, `${protocol}${this.config.domain}`).href,
                data: fields,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Api-Key': this.config.key,
                    'Signature': signature,
                }
            });

            return {
                body: response.data,
                headers: response.headers,
            };

        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                switch (e.response.status) {
                    case 401:
                        throw new InvalidTokenError();

                    case 400:
                        throw new SignatureVerificationError();

                    default:
                        throw new APIError();
                }
            }

            throw e;
        }
    }

    private sanitizeToken(token: string) {
        const arr = token.split(' ');
        return arr[arr.length - 1];
    }

    private forceCast<T>(input: any): T {
        if (input.expires_at) {
            input.expires_at = new Date(input.expires_at);
        }

        // @ts-ignore
        return input;
    }
}

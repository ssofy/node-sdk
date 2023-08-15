import axios, {AxiosError} from 'axios';
import {APIConfig} from "./APIConfig";
import {InvalidTokenError, SignatureVerificationError, APIError} from "../Errors";
import {Models} from "../Models";
import {SignatureGenerator} from "../SignatureGenerator";
import {SignatureVerifier} from "../SignatureVerifier";

export class APIClient {
    private readonly config: APIConfig;
    private readonly signatureGenerator: SignatureGenerator;

    constructor(config: APIConfig) {
        this.config = config;
        this.signatureGenerator = new SignatureGenerator();
    }

    async verifyAuthentication(token: string): Promise<Models.APIResponse> {
        const path = 'v1/authenticated/verify';

        const response = await this.requestAndCache(path, this.sanitizeToken(token));

        return <Models.APIResponse>{
            token: this.forceCast<Models.Token>(response.token)
        };
    }

    async authenticatedUser(token: string, cache: boolean = false): Promise<Models.APIResponse> {
        const path = 'v1/authenticated/user';

        const response = await this.requestAndCache(path, this.sanitizeToken(token), {}, cache);

        return <Models.APIResponse>{
            user: this.forceCast<Models.UserEntity>(response.user),
            token: this.forceCast<Models.Token>(response.token)
        };
    }

    async findUserById(id: string, cache: boolean = false): Promise<Models.APIResponse> {
        const path = `v1/resources/users/find`;

        const response = await this.requestAndCache(path, undefined, {
            id: id,
        }, cache);

        return <Models.APIResponse>{
            user: this.forceCast<Models.UserEntity>(response.user)
        };
    }

    async invalidateTokenCache(token: string): Promise<void> {
        await this.config.cacheStore?.delete(`request:v1/authenticated/verify:${token}`);
        await this.config.cacheStore?.delete(`request:v1/authenticated/user:${token}`);
    }

    async purgeTokenCache(): Promise<void> {
        await this.config.cacheStore?.flushAll();
    }

    private async requestAndCache(path: string, token?: string, fields: any = {}, cache: boolean = true): Promise<any> {
        const cacheKey = `request:{path}:{token}`;

        if (cache) {
            // try the cache first
            const cached = await this.config.cacheStore?.get(cacheKey);
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

            const signatureValidator = new SignatureVerifier(this.signatureGenerator);
            const url = new URL(path, 'http://localhost');
            if (!headers.signature || !await signatureValidator.verifyBase64Signature(url.href, body, this.config.secret, headers.signature)) {
                throw new SignatureVerificationError();
            }

            if (cache) {
                let ttl = 0;

                if (body.token) {
                    ttl = ((new Date(body.token.expires_at)).getTime() - (new Date()).getTime()) / 1000;
                    ttl = Math.max(1, ttl); // token ttl should not be eternal
                }

                await this.config.cacheStore?.put(cacheKey, body.toString(), Math.min(ttl, this.config.cacheTtl ?? 0));
            }

            return body;
        } catch (e) {
            if (e instanceof InvalidTokenError) {
                if (cache) {
                    // cache the failure result to avoid repetitive requests to server
                    await this.config.cacheStore?.put(cacheKey, '', this.config.cacheTtl);
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

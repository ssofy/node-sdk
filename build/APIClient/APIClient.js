"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIClient = void 0;
const axios_1 = __importStar(require("axios"));
const Errors_1 = require("../Errors");
const SignatureGenerator_1 = require("../SignatureGenerator");
const SignatureVerifier_1 = require("../SignatureVerifier");
class APIClient {
    constructor(config) {
        this.config = config;
        this.signatureGenerator = new SignatureGenerator_1.SignatureGenerator();
    }
    verifyAuthentication(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = 'v1/authenticated/verify';
            const response = yield this.requestAndCache(path, this.sanitizeToken(token));
            return {
                token: this.forceCast(response.token)
            };
        });
    }
    authenticatedUser(token, cache = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = 'v1/authenticated/user';
            const response = yield this.requestAndCache(path, this.sanitizeToken(token), {}, cache);
            return {
                user: this.forceCast(response.user),
                token: this.forceCast(response.token)
            };
        });
    }
    findUserById(id, cache = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = `v1/resources/users/find`;
            const response = yield this.requestAndCache(path, undefined, {
                id: id,
            }, cache);
            return {
                user: this.forceCast(response.user)
            };
        });
    }
    invalidateTokenCache(token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.config.cacheStore) === null || _a === void 0 ? void 0 : _a.delete(`request:v1/authenticated/verify:${token}`));
            yield ((_b = this.config.cacheStore) === null || _b === void 0 ? void 0 : _b.delete(`request:v1/authenticated/user:${token}`));
        });
    }
    purgeTokenCache() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.config.cacheStore) === null || _a === void 0 ? void 0 : _a.flushAll());
        });
    }
    requestAndCache(path, token, fields = {}, cache = true) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const cacheKey = `request:{path}:{token}`;
            if (cache) {
                // try the cache first
                const cached = yield ((_a = this.config.cacheStore) === null || _a === void 0 ? void 0 : _a.get(cacheKey));
                if (cached) {
                    if (cached === '') {
                        throw new Errors_1.InvalidTokenError();
                    }
                    return JSON.parse(cached);
                }
                //
            }
            try {
                if (token) {
                    fields['bearer'] = token;
                }
                const response = yield this.request(path, fields, true);
                const body = response.body;
                const headers = response.headers;
                const signatureValidator = new SignatureVerifier_1.SignatureVerifier(this.signatureGenerator);
                const url = new URL(path, 'http://localhost');
                if (!headers.signature || !(yield signatureValidator.verifyBase64Signature(url.href, body, this.config.secret, headers.signature))) {
                    throw new Errors_1.SignatureVerificationError();
                }
                if (cache) {
                    let ttl = 0;
                    if (body.token) {
                        ttl = ((new Date(body.token.expires_at)).getTime() - (new Date()).getTime()) / 1000;
                        ttl = Math.max(1, ttl); // token ttl should not be eternal
                    }
                    yield ((_b = this.config.cacheStore) === null || _b === void 0 ? void 0 : _b.put(cacheKey, body.toString(), Math.min(ttl, (_c = this.config.cacheTtl) !== null && _c !== void 0 ? _c : 0)));
                }
                return body;
            }
            catch (e) {
                if (e instanceof Errors_1.InvalidTokenError) {
                    if (cache) {
                        // cache the failure result to avoid repetitive requests to server
                        yield ((_d = this.config.cacheStore) === null || _d === void 0 ? void 0 : _d.put(cacheKey, '', this.config.cacheTtl));
                    }
                }
                throw e;
            }
        });
    }
    request(path = '/', fields = {}, post = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const protocol = this.config.secure ? 'https://' : 'http://';
            const url = new URL(path, protocol + this.config.domain);
            const saltLength = Math.floor(Math.random() * (9 - 6 + 1)) + 6;
            const salt = Math.random().toString(36).substring(2, saltLength + 2);
            const signature = Buffer.from(JSON.stringify(yield this.signatureGenerator.generate(url.href, fields, this.config.secret, salt)), 'utf8').toString('base64');
            try {
                const response = yield (0, axios_1.default)({
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
            }
            catch (e) {
                if (e instanceof axios_1.AxiosError && e.response) {
                    switch (e.response.status) {
                        case 401:
                            throw new Errors_1.InvalidTokenError();
                        case 400:
                            throw new Errors_1.SignatureVerificationError();
                        default:
                            throw new Errors_1.APIError();
                    }
                }
                throw e;
            }
        });
    }
    sanitizeToken(token) {
        const arr = token.split(' ');
        return arr[arr.length - 1];
    }
    forceCast(input) {
        if (input.expires_at) {
            input.expires_at = new Date(input.expires_at);
        }
        // @ts-ignore
        return input;
    }
}
exports.APIClient = APIClient;

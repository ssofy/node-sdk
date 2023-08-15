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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIClient = void 0;
var axios_1 = __importStar(require("axios"));
var Errors_1 = require("../Errors");
var SignatureGenerator_1 = require("../SignatureGenerator");
var SignatureVerifier_1 = require("../SignatureVerifier");
var APIClient = /** @class */ (function () {
    function APIClient(config) {
        this.config = config;
        this.signatureGenerator = new SignatureGenerator_1.SignatureGenerator();
    }
    APIClient.prototype.verifyAuthentication = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var path, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = 'v1/authenticated/verify';
                        return [4 /*yield*/, this.requestAndCache(path, this.sanitizeToken(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                token: this.forceCast(response.token)
                            }];
                }
            });
        });
    };
    APIClient.prototype.authenticatedUser = function (token, cache) {
        if (cache === void 0) { cache = false; }
        return __awaiter(this, void 0, void 0, function () {
            var path, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = 'v1/authenticated/user';
                        return [4 /*yield*/, this.requestAndCache(path, this.sanitizeToken(token), {}, cache)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                user: this.forceCast(response.user),
                                token: this.forceCast(response.token)
                            }];
                }
            });
        });
    };
    APIClient.prototype.findUserById = function (id, cache) {
        if (cache === void 0) { cache = false; }
        return __awaiter(this, void 0, void 0, function () {
            var path, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = "v1/resources/users/find";
                        return [4 /*yield*/, this.requestAndCache(path, undefined, {
                                id: id,
                            }, cache)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                user: this.forceCast(response.user)
                            }];
                }
            });
        });
    };
    APIClient.prototype.invalidateTokenCache = function (token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, ((_a = this.config.cacheStore) === null || _a === void 0 ? void 0 : _a.delete("request:v1/authenticated/verify:".concat(token)))];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, ((_b = this.config.cacheStore) === null || _b === void 0 ? void 0 : _b.delete("request:v1/authenticated/user:".concat(token)))];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    APIClient.prototype.purgeTokenCache = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.config.cacheStore) === null || _a === void 0 ? void 0 : _a.flushAll())];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    APIClient.prototype.requestAndCache = function (path, token, fields, cache) {
        var _a, _b, _c, _d;
        if (fields === void 0) { fields = {}; }
        if (cache === void 0) { cache = true; }
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cached, response, body, headers, signatureValidator, url, _e, ttl, e_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        cacheKey = "request:{path}:{token}";
                        if (!cache) return [3 /*break*/, 2];
                        return [4 /*yield*/, ((_a = this.config.cacheStore) === null || _a === void 0 ? void 0 : _a.get(cacheKey))];
                    case 1:
                        cached = _f.sent();
                        if (cached) {
                            if (cached === '') {
                                throw new Errors_1.InvalidTokenError();
                            }
                            return [2 /*return*/, JSON.parse(cached)];
                        }
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 8, , 11]);
                        if (token) {
                            fields['bearer'] = token;
                        }
                        return [4 /*yield*/, this.request(path, fields, true)];
                    case 3:
                        response = _f.sent();
                        body = response.body;
                        headers = response.headers;
                        signatureValidator = new SignatureVerifier_1.SignatureVerifier(this.signatureGenerator);
                        url = new URL(path, 'http://localhost');
                        _e = !headers.signature;
                        if (_e) return [3 /*break*/, 5];
                        return [4 /*yield*/, signatureValidator.verifyBase64Signature(url.href, body, this.config.secret, headers.signature)];
                    case 4:
                        _e = !(_f.sent());
                        _f.label = 5;
                    case 5:
                        if (_e) {
                            throw new Errors_1.SignatureVerificationError();
                        }
                        if (!cache) return [3 /*break*/, 7];
                        ttl = 0;
                        if (body.token) {
                            ttl = ((new Date(body.token.expires_at)).getTime() - (new Date()).getTime()) / 1000;
                            ttl = Math.max(1, ttl); // token ttl should not be eternal
                        }
                        return [4 /*yield*/, ((_b = this.config.cacheStore) === null || _b === void 0 ? void 0 : _b.put(cacheKey, body.toString(), Math.min(ttl, (_c = this.config.cacheTtl) !== null && _c !== void 0 ? _c : 0)))];
                    case 6:
                        _f.sent();
                        _f.label = 7;
                    case 7: return [2 /*return*/, body];
                    case 8:
                        e_1 = _f.sent();
                        if (!(e_1 instanceof Errors_1.InvalidTokenError)) return [3 /*break*/, 10];
                        if (!cache) return [3 /*break*/, 10];
                        // cache the failure result to avoid repetitive requests to server
                        return [4 /*yield*/, ((_d = this.config.cacheStore) === null || _d === void 0 ? void 0 : _d.put(cacheKey, '', this.config.cacheTtl))];
                    case 9:
                        // cache the failure result to avoid repetitive requests to server
                        _f.sent();
                        _f.label = 10;
                    case 10: throw e_1;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    APIClient.prototype.request = function (path, fields, post) {
        if (path === void 0) { path = '/'; }
        if (fields === void 0) { fields = {}; }
        if (post === void 0) { post = false; }
        return __awaiter(this, void 0, void 0, function () {
            var protocol, url, saltLength, salt, signature, _a, _b, _c, _d, response, e_2;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        protocol = this.config.secure ? 'https://' : 'http://';
                        url = new URL(path, protocol + this.config.domain);
                        saltLength = Math.floor(Math.random() * (9 - 6 + 1)) + 6;
                        salt = Math.random().toString(36).substring(2, saltLength + 2);
                        _b = (_a = Buffer).from;
                        _d = (_c = JSON).stringify;
                        return [4 /*yield*/, this.signatureGenerator.generate(url.href, fields, this.config.secret, salt)];
                    case 1:
                        signature = _b.apply(_a, [_d.apply(_c, [_e.sent()]),
                            'utf8']).toString('base64');
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, (0, axios_1.default)({
                                method: post ? 'post' : 'get',
                                url: new URL(path, "".concat(protocol).concat(this.config.domain)).href,
                                data: fields,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'Api-Key': this.config.key,
                                    'Signature': signature,
                                }
                            })];
                    case 3:
                        response = _e.sent();
                        return [2 /*return*/, {
                                body: response.data,
                                headers: response.headers,
                            }];
                    case 4:
                        e_2 = _e.sent();
                        if (e_2 instanceof axios_1.AxiosError && e_2.response) {
                            switch (e_2.response.status) {
                                case 401:
                                    throw new Errors_1.InvalidTokenError();
                                case 400:
                                    throw new Errors_1.SignatureVerificationError();
                                default:
                                    throw new Errors_1.APIError();
                            }
                        }
                        throw e_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    APIClient.prototype.sanitizeToken = function (token) {
        var arr = token.split(' ');
        return arr[arr.length - 1];
    };
    APIClient.prototype.forceCast = function (input) {
        if (input.expires_at) {
            input.expires_at = new Date(input.expires_at);
        }
        // @ts-ignore
        return input;
    };
    return APIClient;
}());
exports.APIClient = APIClient;

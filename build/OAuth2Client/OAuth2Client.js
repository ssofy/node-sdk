"use strict";
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
exports.OAuth2Client = void 0;
var OAuth2Config_1 = require("./OAuth2Config");
var NullStorage_1 = require("../Storage/NullStorage");
var ResourceOwnerRequest_1 = require("./ResourceOwnerRequest");
var AuthorizationRequestHandler_1 = require("./AuthorizationRequestHandler");
var UserInfoRequestHandler_1 = require("./UserInfoRequestHandler");
var appauth_1 = require("@openid/appauth");
var node_support_1 = require("@openid/appauth/built/node_support");
var OAuth2Client = /** @class */ (function () {
    function OAuth2Client(config) {
        var _a;
        this.config = config;
        this.stateStore = (_a = config.stateStore) !== null && _a !== void 0 ? _a : new NullStorage_1.NullStorage();
    }
    OAuth2Client.prototype.initAuthCodeFlow = function (uri, nextUri) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var authorizationUrl, extras, request, stateData, authorizationHandler;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        authorizationUrl = (_a = this.config.authorizationUrl()) !== null && _a !== void 0 ? _a : '';
                        extras = this.getUrlParams(authorizationUrl);
                        authorizationUrl = this.getUrl(authorizationUrl);
                        request = new appauth_1.AuthorizationRequest({
                            client_id: (_b = this.config.clientId) !== null && _b !== void 0 ? _b : '',
                            redirect_uri: (_c = this.config.redirectUri) !== null && _c !== void 0 ? _c : '',
                            scope: (_e = (_d = this.config.scopes) === null || _d === void 0 ? void 0 : _d.join(' ')) !== null && _e !== void 0 ? _e : '',
                            response_type: appauth_1.AuthorizationRequest.RESPONSE_TYPE_CODE,
                            extras: extras,
                        }, new node_support_1.NodeCrypto(), this.config.pkceVerification);
                        stateData = {
                            uri: nextUri,
                            config: this.config.toJson(),
                        };
                        if (!this.config.pkceVerification) return [3 /*break*/, 2];
                        return [4 /*yield*/, request.setupCodeVerifier()];
                    case 1:
                        _g.sent();
                        stateData['pkce'] = {
                            code: (_f = request.internal) === null || _f === void 0 ? void 0 : _f.code_verifier
                        };
                        _g.label = 2;
                    case 2: return [4 /*yield*/, this.saveState(request.state, stateData, this.config.timeout)];
                    case 3:
                        _g.sent();
                        authorizationHandler = new AuthorizationRequestHandler_1.AuthorizationRequestHandler();
                        return [2 /*return*/, {
                                state: request.state,
                                uri: authorizationHandler.buildRequestUrl({
                                    authorizationEndpoint: authorizationUrl,
                                }, request),
                            }];
                }
            });
        });
    };
    OAuth2Client.prototype.continueAuthCodeFlow = function (state, code) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var stateData, config, extras, request, tokenHandler, response;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.getState(state)];
                    case 1:
                        stateData = _d.sent();
                        config = new OAuth2Config_1.OAuth2Config(stateData.config);
                        extras = undefined;
                        if (config.pkceVerification) {
                            extras = {};
                            extras['code_verifier'] = stateData.pkce.code;
                        }
                        request = new appauth_1.TokenRequest({
                            client_id: (_a = config.clientId) !== null && _a !== void 0 ? _a : '',
                            redirect_uri: (_b = config.redirectUri) !== null && _b !== void 0 ? _b : '',
                            grant_type: appauth_1.GRANT_TYPE_AUTHORIZATION_CODE,
                            code: code,
                            extras: extras,
                        });
                        tokenHandler = new appauth_1.BaseTokenRequestHandler(new node_support_1.NodeRequestor());
                        return [4 /*yield*/, tokenHandler.performTokenRequest({
                                tokenEndpoint: this.getUrl((_c = this.config.tokenUrl()) !== null && _c !== void 0 ? _c : ''),
                            }, request)];
                    case 2:
                        response = _d.sent();
                        stateData['token'] = response.toJson();
                        return [4 /*yield*/, this.saveState(state, stateData, this.config.stateTtl)];
                    case 3:
                        _d.sent();
                        return [2 /*return*/, stateData];
                }
            });
        });
    };
    OAuth2Client.prototype.getConfig = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var stateData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getState(state)];
                    case 1:
                        stateData = _a.sent();
                        if (!stateData.config) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, new OAuth2Config_1.OAuth2Config(stateData.config)];
                }
            });
        });
    };
    OAuth2Client.prototype.getUserInfo = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var stateData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getState(state)];
                    case 1:
                        stateData = _a.sent();
                        if (!!stateData.user) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.refreshUserInfo(state)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/, stateData.user];
                }
            });
        });
    };
    OAuth2Client.prototype.refreshUserInfo = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var stateData, userInfoHandler, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getState(state)];
                    case 1:
                        stateData = _a.sent();
                        if (!stateData.token) {
                            return [2 /*return*/, null];
                        }
                        userInfoHandler = new UserInfoRequestHandler_1.UserInfoRequestHandler();
                        return [4 /*yield*/, userInfoHandler.performUserInfoRequest({
                                userInfoEndpoint: this.config.resourceOwnerUrl(),
                            }, new ResourceOwnerRequest_1.ResourceOwnerRequest(stateData.token.access_token))];
                    case 2:
                        user = _a.sent();
                        stateData['user'] = user;
                        return [4 /*yield*/, this.saveState(state, stateData, this.config.stateTtl)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    OAuth2Client.prototype.getAccessToken = function (state) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var stateData, token, expiryTime, config, extras, request, tokenHandler, response;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.getState(state)];
                    case 1:
                        stateData = _f.sent();
                        if (!stateData.token) {
                            return [2 /*return*/, null];
                        }
                        token = stateData['token'];
                        expiryTime = ((_a = token.issued_at) !== null && _a !== void 0 ? _a : 0) + Number.parseInt((_b = token.expires_in) !== null && _b !== void 0 ? _b : '0');
                        if (expiryTime >= Math.floor(Date.now() / 1000)) {
                            return [2 /*return*/, token];
                        }
                        config = new OAuth2Config_1.OAuth2Config(stateData['config']);
                        extras = {
                            'client_secret': (_c = config.clientSecret) !== null && _c !== void 0 ? _c : '',
                        };
                        if (config.pkceVerification) {
                            extras['code_verifier'] = stateData.pkce.code;
                        }
                        request = new appauth_1.TokenRequest({
                            client_id: (_d = config.clientId) !== null && _d !== void 0 ? _d : '',
                            redirect_uri: (_e = config.redirectUri) !== null && _e !== void 0 ? _e : '',
                            grant_type: appauth_1.GRANT_TYPE_REFRESH_TOKEN,
                            refresh_token: token.refresh_token,
                            extras: extras,
                        });
                        tokenHandler = new appauth_1.BaseTokenRequestHandler(new node_support_1.NodeRequestor());
                        return [4 /*yield*/, tokenHandler.performTokenRequest({
                                tokenEndpoint: this.config.tokenUrl(),
                            }, request)];
                    case 2:
                        response = _f.sent();
                        stateData['token'] = response.toJson();
                        return [4 /*yield*/, this.saveState(state, stateData, this.config.stateTtl)];
                    case 3:
                        _f.sent();
                        return [2 /*return*/, stateData.token];
                }
            });
        });
    };
    OAuth2Client.prototype.getState = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stateStore.get(this.stateStorageKey(state))];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, JSON.parse(data)];
                }
            });
        });
    };
    OAuth2Client.prototype.saveState = function (state, data, timeout) {
        if (timeout === void 0) { timeout = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = this.stateStorageKey(state);
                        return [4 /*yield*/, this.stateStore.delete(key)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.stateStore.put(key, JSON.stringify(data), timeout)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OAuth2Client.prototype.deleteState = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stateStore.delete(this.stateStorageKey(state))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OAuth2Client.prototype.stateStorageKey = function (state) {
        return "oauth:state:".concat(state);
    };
    OAuth2Client.prototype.getUrlParams = function (url) {
        var paramObject = {};
        var myUrl = new URL(url);
        myUrl.searchParams.forEach(function (value, key) {
            paramObject[key] = value;
        });
        return paramObject;
    };
    OAuth2Client.prototype.getUrl = function (url) {
        var result = new URL(url);
        return result.origin + result.pathname;
    };
    return OAuth2Client;
}());
exports.OAuth2Client = OAuth2Client;

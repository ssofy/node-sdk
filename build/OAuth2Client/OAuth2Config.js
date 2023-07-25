"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth2Config = void 0;
var OAuth2Config = /** @class */ (function () {
    function OAuth2Config(params) {
        var _a, _b, _c, _d, _e;
        Object.assign(this, params);
        this.pkceVerification = (_a = this.pkceVerification) !== null && _a !== void 0 ? _a : true;
        this.timeout = (_b = this.timeout) !== null && _b !== void 0 ? _b : 60 * 60; // default: 1 hour
        this.scopes = (_c = this.scopes) !== null && _c !== void 0 ? _c : ['*'];
        this.locale = (_d = this.locale) !== null && _d !== void 0 ? _d : 'en';
        this.stateTtl = (_e = this.stateTtl) !== null && _e !== void 0 ? _e : 60 * 60 * 24 * 365; // default: 1 year
    }
    OAuth2Config.prototype.authorizationUrl = function (token) {
        if (!this.url) {
            return null;
        }
        var params = {};
        if (token) {
            params['token'] = token;
        }
        return this.addUrlParams(this.urlJoin(this.url, '/authorize'), params);
    };
    OAuth2Config.prototype.socialAuthorizationUrl = function (provider) {
        if (!this.url) {
            return null;
        }
        provider = provider.toLowerCase();
        return this.addUrlParams(this.urlJoin(this.url, "/social/".concat(provider, "/authorize")));
    };
    OAuth2Config.prototype.tokenUrl = function () {
        if (!this.url) {
            return null;
        }
        return this.addUrlParams(this.urlJoin(this.url, '/token'));
    };
    OAuth2Config.prototype.logoutUrl = function () {
        if (!this.url) {
            return null;
        }
        return this.addUrlParams(this.urlJoin(this.url, '/logout'), {
            redirect_uri: this.redirectUri
        });
    };
    OAuth2Config.prototype.logoutEverywhereUrl = function () {
        if (!this.url) {
            return null;
        }
        return this.addUrlParams(this.urlJoin(this.url, '/logout-everywhere'), {
            redirect_uri: this.redirectUri,
        });
    };
    OAuth2Config.prototype.registrationUrl = function () {
        if (!this.url) {
            return null;
        }
        return this.addUrlParams(this.urlJoin(this.url, '/register'), {
            redirect_uri: this.redirectUri,
        });
    };
    OAuth2Config.prototype.profileUrl = function () {
        if (!this.url) {
            return null;
        }
        return this.addUrlParams(this.urlJoin(this.url, '/account'));
    };
    OAuth2Config.prototype.resourceOwnerUrl = function () {
        if (!this.url) {
            return null;
        }
        return this.urlJoin(this.url, '/userinfo');
    };
    OAuth2Config.prototype.toJson = function () {
        var data = __assign({}, this);
        delete data.stateStore;
        return data;
    };
    OAuth2Config.prototype.addUrlParams = function (url, extraParams) {
        if (extraParams === void 0) { extraParams = {}; }
        var params = extraParams;
        var locale = this.locale;
        if (locale) {
            params['locale'] = locale;
        }
        if (Object.keys(params).length > 0) {
            var urlObj_1 = new URL(url);
            Object.keys(params).forEach(function (key) { return urlObj_1.searchParams.append(key, params[key]); });
            url = urlObj_1.toString();
        }
        return url;
    };
    OAuth2Config.prototype.urlJoin = function (url, path) {
        var urlObj = new URL(url);
        urlObj.pathname = path;
        return urlObj.toString();
    };
    return OAuth2Config;
}());
exports.OAuth2Config = OAuth2Config;

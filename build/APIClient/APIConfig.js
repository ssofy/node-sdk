"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIConfig = void 0;
var javascript_sdk_1 = require("@ssofy/javascript-sdk");
var APIConfig = /** @class */ (function () {
    function APIConfig(params) {
        var _a, _b, _c;
        Object.assign(this, params);
        this.cacheStore = (_a = this.cacheStore) !== null && _a !== void 0 ? _a : new javascript_sdk_1.NullStorage();
        this.cacheTtl = (_b = this.cacheTtl) !== null && _b !== void 0 ? _b : 60 * 60 * 3;
        this.secure = (_c = this.secure) !== null && _c !== void 0 ? _c : false;
    }
    return APIConfig;
}());
exports.APIConfig = APIConfig;

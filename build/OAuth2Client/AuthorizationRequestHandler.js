"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationRequestHandler = void 0;
var appauth_1 = require("@openid/appauth");
var AuthorizationRequestHandler = /** @class */ (function (_super) {
    __extends(AuthorizationRequestHandler, _super);
    function AuthorizationRequestHandler() {
        var utils = new appauth_1.BasicQueryStringUtils();
        var crypto = new appauth_1.DefaultCrypto();
        return _super.call(this, utils, crypto) || this;
    }
    AuthorizationRequestHandler.prototype.buildRequestUrl = function (configuration, request) {
        return _super.prototype.buildRequestUrl.call(this, configuration, request);
    };
    AuthorizationRequestHandler.prototype.completeAuthorizationRequest = function () {
        return Promise.resolve(null);
    };
    AuthorizationRequestHandler.prototype.performAuthorizationRequest = function (configuration, request) {
    };
    return AuthorizationRequestHandler;
}(appauth_1.AuthorizationRequestHandler));
exports.AuthorizationRequestHandler = AuthorizationRequestHandler;

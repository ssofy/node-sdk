"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoRequestHandler = void 0;
var appauth_1 = require("@openid/appauth");
var node_support_1 = require("@openid/appauth/built/node_support");
var UserInfoRequestHandler = /** @class */ (function () {
    function UserInfoRequestHandler() {
        this.requester = new node_support_1.NodeRequestor();
    }
    UserInfoRequestHandler.prototype.performUserInfoRequest = function (configuration, request) {
        var userInfo = this.requester.xhr({
            url: configuration.userInfoEndpoint,
            method: 'GET',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + request.token,
            }
        });
        return userInfo.then(function (response) {
            if (response.error) {
                Promise.reject(new appauth_1.AppAuthError(response.error, response));
                return;
            }
            return response;
        });
    };
    return UserInfoRequestHandler;
}());
exports.UserInfoRequestHandler = UserInfoRequestHandler;

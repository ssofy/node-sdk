"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceOwnerRequest = void 0;
var ResourceOwnerRequest = /** @class */ (function () {
    function ResourceOwnerRequest(token) {
        this.token = token;
    }
    ResourceOwnerRequest.prototype.toJson = function () {
        return {
            token: this.token
        };
    };
    ResourceOwnerRequest.prototype.toStringMap = function () {
        var json = this.toJson();
        return json;
    };
    return ResourceOwnerRequest;
}());
exports.ResourceOwnerRequest = ResourceOwnerRequest;

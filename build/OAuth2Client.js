"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth2Client = void 0;
const javascript_sdk_1 = require("@ssofy/javascript-sdk");
class OAuth2Client extends javascript_sdk_1.OAuth2Client {
    constructor(config) {
        super(config);
    }
}
exports.OAuth2Client = OAuth2Client;

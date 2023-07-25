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
exports.OAuth2Client = void 0;
var OAuth2Client_1 = require("./OAuth2Client/OAuth2Client");
var OAuth2Client = /** @class */ (function (_super) {
    __extends(OAuth2Client, _super);
    function OAuth2Client(config) {
        return _super.call(this, config) || this;
    }
    return OAuth2Client;
}(OAuth2Client_1.OAuth2Client));
exports.OAuth2Client = OAuth2Client;

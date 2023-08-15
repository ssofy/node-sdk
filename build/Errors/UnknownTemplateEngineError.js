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
exports.UnknownTemplateEngineError = void 0;
var BaseError_1 = require("./BaseError");
var UnknownTemplateEngineError = /** @class */ (function (_super) {
    __extends(UnknownTemplateEngineError, _super);
    function UnknownTemplateEngineError(engine) {
        var _this = _super.call(this, "Unknown template engine: ".concat(engine)) || this;
        _this.engine = engine;
        return _this;
    }
    return UnknownTemplateEngineError;
}(BaseError_1.BaseError));
exports.UnknownTemplateEngineError = UnknownTemplateEngineError;

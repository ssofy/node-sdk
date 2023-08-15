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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEventManager = void 0;
var EventManager_1 = require("./EventManager");
var events_1 = __importDefault(require("events"));
var DefaultEventManager = /** @class */ (function (_super) {
    __extends(DefaultEventManager, _super);
    function DefaultEventManager(eventEmitterOptions) {
        var _this = _super.call(this) || this;
        DefaultEventManager.eventEmitter = new events_1.default(eventEmitterOptions);
        return _this;
    }
    DefaultEventManager.prototype.emit = function (event, message) {
        DefaultEventManager.eventEmitter.emit(event, event, message);
    };
    DefaultEventManager.prototype.listen = function (event, handler) {
        DefaultEventManager.eventEmitter.addListener(event, handler);
    };
    return DefaultEventManager;
}(EventManager_1.EventManager));
exports.DefaultEventManager = DefaultEventManager;

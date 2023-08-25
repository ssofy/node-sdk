"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEventManager = void 0;
const EventManager_1 = require("./EventManager");
const events_1 = __importDefault(require("events"));
class DefaultEventManager extends EventManager_1.EventManager {
    constructor(eventEmitterOptions) {
        super();
        DefaultEventManager.eventEmitter = new events_1.default(eventEmitterOptions);
    }
    emit(event, message) {
        DefaultEventManager.eventEmitter.emit(event, event, message);
    }
    listen(event, handler) {
        DefaultEventManager.eventEmitter.addListener(event, handler);
    }
}
exports.DefaultEventManager = DefaultEventManager;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeChannel = void 0;
const Channel_1 = require("./Channel");
const events_1 = __importDefault(require("events"));
class NodeChannel extends Channel_1.Channel {
    constructor(eventEmitterOptions) {
        super();
        this.eventEmitter = new events_1.default(eventEmitterOptions);
    }
    publish(event, message) {
        this.eventEmitter.emit(event, event, message);
    }
    subscribe(event, handler) {
        this.eventEmitter.addListener(event, handler);
    }
}
exports.NodeChannel = NodeChannel;

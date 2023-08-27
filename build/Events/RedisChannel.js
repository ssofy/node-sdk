"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisChannel = void 0;
const Channel_1 = require("./Channel");
class RedisChannel extends Channel_1.Channel {
    constructor(publisher, subscriber, channelPrefix = 'sso:') {
        super();
        this.messageQueue = [];
        this.handlers = {};
        this.publisher = publisher;
        this.subscriber = subscriber;
        this.channelPrefix = channelPrefix;
        if (subscriber) {
            subscriber.on('ready', this.resubscribe.bind(this));
        }
        if (publisher) {
            publisher.on('ready', this.flushQueue.bind(this));
        }
    }
    publish(event, message) {
        if (this.publisher.isReady) {
            this.actualEmit(event, message);
            return;
        }
        this.messageQueue.push({ event, message });
    }
    subscribe(event, handler) {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }
        this.handlers[event].push(handler);
        if (this.subscriber.isReady) {
            this.actualSubscribe(event);
        }
    }
    actualEmit(event, message) {
        this.publisher.publish(this.channelPrefix + event, JSON.stringify(message !== null && message !== void 0 ? message : {}));
    }
    actualSubscribe(event) {
        this.subscriber.subscribe(this.channelPrefix + event, (message) => {
            console.log(this.handlers);
            if (!this.handlers[event]) {
                return;
            }
            const parsedMessage = JSON.parse(message !== null && message !== void 0 ? message : '{}');
            for (const handler of this.handlers[event]) {
                handler(event, parsedMessage);
            }
        });
    }
    flushQueue() {
        setTimeout(() => {
            while (this.messageQueue.length > 0) {
                const { event, message } = this.messageQueue.shift();
                this.actualEmit(event, message);
            }
        }, 5000);
    }
    resubscribe() {
        const events = Object.keys(this.handlers);
        for (const event of events) {
            this.actualSubscribe(event);
        }
    }
}
exports.RedisChannel = RedisChannel;

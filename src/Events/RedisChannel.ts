import {Channel} from "./Channel";

export class RedisChannel extends Channel {
    private publisher?: any;
    private subscriber?: any;
    private readonly channelPrefix: string;

    private messageQueue: Array<{ event: string, message: any }> = [];
    private handlers: { [event: string]: Array<(event: string, message?: any) => void> } = {};

    constructor(publisher?: any, subscriber?: any, channelPrefix: string = 'sso:') {
        super();
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

    publish(event: string, message?: any): void {
        if (this.publisher.isReady) {
            this.actualEmit(event, message);
            return;
        }

        this.messageQueue.push({event, message});
    }

    subscribe(event: string, handler: (event: string, message?: any) => void): void {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }

        this.handlers[event].push(handler);

        if (this.subscriber.isReady) {
            this.actualSubscribe(event);
        }
    }

    private actualEmit(event: string, message: any): void {
        this.publisher.publish(this.channelPrefix + event, JSON.stringify(message ?? {}));
    }

    private actualSubscribe(event: string): void {
        this.subscriber.subscribe(this.channelPrefix + event, (message: any) => {
            console.log(this.handlers);
            if (!this.handlers[event]) {
                return;
            }

            const parsedMessage = JSON.parse(message ?? '{}');
            for (const handler of this.handlers[event]) {
                handler(event, parsedMessage);
            }
        });
    }

    private flushQueue(): void {
        setTimeout(() => {
            while (this.messageQueue.length > 0) {
                const {event, message} = this.messageQueue.shift()!;
                this.actualEmit(event, message);
            }
        }, 5000);
    }

    private resubscribe(): void {
        const events = Object.keys(this.handlers);
        for (const event of events) {
            this.actualSubscribe(event);
        }
    }
}

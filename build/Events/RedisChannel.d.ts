import { Channel } from "./Channel";
export declare class RedisChannel extends Channel {
    private publisher?;
    private subscriber?;
    private readonly channelPrefix;
    private messageQueue;
    private handlers;
    constructor(publisher?: any, subscriber?: any, channelPrefix?: string);
    publish(event: string, message?: any): void;
    subscribe(event: string, handler: (event: string, message?: any) => void): void;
    private actualEmit;
    private actualSubscribe;
    private flushQueue;
    private resubscribe;
}

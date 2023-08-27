import { Channel } from "./Channel";
export declare class NodeChannel extends Channel {
    private eventEmitter;
    constructor(eventEmitterOptions?: any);
    publish(event: string, message?: any): void;
    subscribe(event: string, handler: {
        (event: string, message?: any): void;
    }): void;
}

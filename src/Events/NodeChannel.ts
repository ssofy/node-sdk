import {Channel} from "./Channel";
import EventEmitter from "events";

export class NodeChannel extends Channel {
    private eventEmitter: EventEmitter;

    constructor(eventEmitterOptions?: any) {
        super();
        this.eventEmitter = new EventEmitter(eventEmitterOptions);
    }

    publish(event: string, message?: any): void {
        this.eventEmitter.emit(event, event, message);
    }

    subscribe(event: string, handler: { (event: string, message?: any): void }): void {
        this.eventEmitter.addListener(event, handler);
    }
}

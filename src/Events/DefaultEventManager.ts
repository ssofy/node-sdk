import {EventManager} from "./EventManager";
import EventEmitter from "events";

export class DefaultEventManager extends EventManager {
    private static eventEmitter: EventEmitter;

    constructor(eventEmitterOptions?: any) {
        super();
        DefaultEventManager.eventEmitter = new EventEmitter(eventEmitterOptions);
    }

    emit(event: string, message?: any): void {
        DefaultEventManager.eventEmitter.emit(event, event, message);
    }

    listen(event: string, handler: { (event: string, message?: any): void }): void {
        DefaultEventManager.eventEmitter.addListener(event, handler);
    }
}

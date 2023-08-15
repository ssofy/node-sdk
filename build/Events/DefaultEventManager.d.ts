import { EventManager } from "./EventManager";
export declare class DefaultEventManager extends EventManager {
    private static eventEmitter;
    constructor(eventEmitterOptions?: any);
    emit(event: string, message?: any): void;
    listen(event: string, handler: {
        (event: string, message?: any): void;
    }): void;
}

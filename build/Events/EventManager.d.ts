export declare abstract class EventManager {
    abstract emit(event: string, message?: any): void;
    abstract listen(event: string, handler: {
        (event: string, message?: any): void;
    }): void;
}

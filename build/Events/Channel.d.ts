export declare abstract class Channel {
    abstract publish(event: string, message?: any): void;
    abstract subscribe(event: string, handler: {
        (event: string, message?: any): void;
    }): void;
}

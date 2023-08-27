import { Notifier } from "./Notifier";
export declare class ConsoleNotifier extends Notifier {
    notify(receiver: string, template: string, data?: any): Promise<void>;
}

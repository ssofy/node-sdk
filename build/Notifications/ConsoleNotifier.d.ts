import { Notifications } from ".";
import { Notifier } from "./Notifier";
export declare class ConsoleNotifier extends Notifier {
    notify(templateName: string, format: Notifications.Format, to: string, data?: any): Promise<void>;
}

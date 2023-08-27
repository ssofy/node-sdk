import { Notifications } from ".";
import { Notifier } from "./Notifier";
export declare class MandrillNotifier extends Notifier {
    protected apiKey: string;
    protected apiUrl: string;
    constructor(apiKey: string, sender: string, templates?: Notifications.Template[], vars?: any);
    notify(receiver: string, template: string, data?: any): Promise<void>;
}

import { Notifications } from ".";
import { Notifier } from "./Notifier";
import { Vonage } from "@vonage/server-sdk";
export declare class VonageSMSNotifier extends Notifier {
    private client;
    constructor(vonage: Vonage, channel: Notifications.Channel, sender: string, templates?: Notifications.Template[], vars?: any);
    notify(receiver: string, template: string, data?: any): Promise<void>;
}

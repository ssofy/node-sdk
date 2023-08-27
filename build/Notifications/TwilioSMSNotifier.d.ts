import { Notifications } from ".";
import { Notifier } from "./Notifier";
import { Twilio } from "twilio";
export declare class TwilioSMSNotifier extends Notifier {
    private client;
    constructor(twilio: Twilio, sender: string, templates?: Notifications.Template[], vars?: any);
    notify(receiver: string, template: string, data?: any): Promise<void>;
}

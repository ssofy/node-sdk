import { Notifications } from ".";
import { Notifier } from "./Notifier";
export declare class MailchimpEmailNotifier extends Notifier {
    protected mailchimp: any;
    constructor(mailchimp: any, sender: string, templates?: Notifications.Template[], vars?: any);
    notify(receiver: string, template: string, data?: any): Promise<void>;
}

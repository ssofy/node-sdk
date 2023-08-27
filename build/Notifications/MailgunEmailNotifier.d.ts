import { Notifications } from ".";
import { Notifier } from "./Notifier";
import { Interfaces } from 'mailgun.js';
export declare class MailgunEmailNotifier extends Notifier {
    protected client: Interfaces.IMailgunClient;
    protected domain: string;
    constructor(mailgun: Interfaces.IMailgunClient, domain: string, sender: string, templates?: Notifications.Template[], vars?: any);
    notify(receiver: string, template: string, data?: any): Promise<void>;
}

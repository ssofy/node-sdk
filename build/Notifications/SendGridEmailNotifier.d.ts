import { Notifications } from ".";
import { Notifier } from "./Notifier";
import sgMail from '@sendgrid/mail';
export declare class SendGridEmailNotifier extends Notifier {
    private client;
    constructor(sgMailInstance: typeof sgMail, sender: string, templates?: Notifications.Template[], vars?: any);
    notify(receiver: string, template: string, data?: any): Promise<void>;
}

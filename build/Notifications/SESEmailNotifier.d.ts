import { Notifications } from ".";
import { Notifier } from "./Notifier";
import AWS from 'aws-sdk';
export declare class SESEmailNotifier extends Notifier {
    private client;
    constructor(ses: AWS.SES, sender: string, templates?: Notifications.Template[], vars?: any);
    notify(receiver: string, template: string, data?: any): Promise<void>;
}

import { Notifications } from ".";
import { Notifier } from "./Notifier";
import nodemailer from "nodemailer";
export declare class NodemailerEmailNotifier extends Notifier {
    private client;
    constructor(transporter: nodemailer.Transporter, channel: Notifications.Channel, sender: string, templates?: Notifications.Template[], vars?: any);
    notify(receiver: string, template: string, data?: any): Promise<void>;
}

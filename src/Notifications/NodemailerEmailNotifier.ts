import {Notifications} from ".";
import {Notifier} from "./Notifier";
import nodemailer from "nodemailer";

export class NodemailerEmailNotifier extends Notifier {
    private client: nodemailer.Transporter;

    constructor(
        transporter: nodemailer.Transporter,
        channel: Notifications.Channel,
        sender: string,
        templates: Notifications.Template[] = [],
        vars: any = {}
    ) {
        super(channel, sender, templates, vars);
        this.client = transporter;
    }

    async notify(receiver: string, template: string, data?: any): Promise<void> {
        const messageContent = await this.render(template, data);

        const mailOptions = {
            to: receiver,
            from: this.sender,
            subject: this.vars.subject ?? 'Verification Code',
            html: messageContent,
        };

        try {
            const info = await this.client.sendMail(mailOptions);
            console.debug('Message sent successfully using Nodemailer:', info.messageId);
        } catch (err) {
            console.error('Error sending email using Nodemailer:', err);
        }
    }
}

import {Notifications} from ".";
import {Notifier} from "./Notifier";
import {Interfaces} from 'mailgun.js';

export class MailgunEmailNotifier extends Notifier {
    protected client: Interfaces.IMailgunClient;
    protected domain: string;

    constructor(
        mailgun: Interfaces.IMailgunClient,
        domain: string,
        sender: string,
        templates: Notifications.Template[] = [],
        vars: any = {}
    ) {
        super(Notifications.Channel.EMAIL, sender, templates, vars);
        this.client = mailgun;
        this.domain = domain;
    }

    async notify(receiver: string, template: string, data?: any): Promise<void> {
        const messageContent = await this.render(template, data);

        const messageData = {
            from: this.sender,
            to: receiver,
            subject: this.vars.subject ?? 'Verification Code',
            html: messageContent,
        };

        try {
            const response = await this.client.messages.create(this.domain, messageData);
            console.log('Email sent successfully using Mailgun:', response);
        } catch (error) {
            console.error('Error sending email using Mailgun:', error);
        }
    }
}

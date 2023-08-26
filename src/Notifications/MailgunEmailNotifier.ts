import {Notifications} from ".";
import {Notifier} from "./Notifier";
import Mailgun from 'mailgun-js';

export class MailgunEmailNotifier extends Notifier {
    private client: Mailgun.Mailgun;

    constructor(
        mailgun: Mailgun.Mailgun,
        sender: string,
        templates: Notifications.Template[] = [],
        vars: any = {}
    ) {
        super(Notifications.Channel.EMAIL, sender, templates, vars);
        this.client = mailgun;
    }

    async notify(receiver: string, template: string, data?: any): Promise<void> {
        const messageContent = await this.render(template, data);

        const messageData = {
            from: this.sender,
            to: receiver,
            subject: this.vars.subject ?? 'Verification Code',
            html: messageContent,
        };

        await this.client.messages().send(messageData, (error, body) => {
            if (error) {
                console.error('Error sending email using Mailgun:', error);
            } else {
                console.log('Email sent successfully using Mailgun:', body);
            }
        });
    }
}

import {Notifications} from ".";
import {Notifier} from "./Notifier";
import sgMail from '@sendgrid/mail';

export class SendGridEmailNotifier extends Notifier {
    private client: typeof sgMail;

    constructor(
        sgMailInstance: typeof sgMail,
        sender: string,
        templates: Notifications.Template[] = [],
        vars: any = {}
    ) {
        super(Notifications.Channel.EMAIL, sender, templates, vars);
        this.client = sgMailInstance;
    }

    async notify(receiver: string, template: string, data?: any): Promise<void> {
        const messageContent = await this.render(template, data);

        const msg = {
            to: receiver,
            from: this.sender,
            subject: this.vars.subject ?? 'Verification Code',
            html: messageContent,
        };

        try {
            const response = await this.client.send(msg);
            console.error('Email sent successfully using SendGrid');
        } catch (error) {
            console.debug('Error sending email using SendGrid:', error);
        }
    }
}





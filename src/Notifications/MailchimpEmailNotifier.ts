import {Notifications} from ".";
import {Notifier} from "./Notifier";

export class MailchimpEmailNotifier extends Notifier {
    protected mailchimp: any;

    constructor(
        mailchimp: any,
        sender: string,
        templates: Notifications.Template[] = [],
        vars: any = {}
    ) {
        super(Notifications.Channel.EMAIL, sender, templates, vars);
        this.mailchimp = mailchimp;
    }

    async notify(receiver: string, template: string, data?: any): Promise<void> {
        const messageContent = await this.render(template, data);

        const message = {
            html: messageContent,
            subject: this.vars.subject ?? 'Verification Code',
            from_email: this.sender,
            to: [
                {
                    email: receiver
                }
            ]
        };

        try {
            const response = await this.mailchimp.messages.send({
                message,
            });
            console.debug('Email sent successfully using Mandrill:', response.data[0]);
        } catch (error) {
            console.error('Error sending email using Mandrill:', error);
        }
    }
}

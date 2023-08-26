import {Notifications} from ".";
import {Notifier} from "./Notifier";
import AWS from 'aws-sdk';

export class SESEmailNotifier extends Notifier {
    private client: AWS.SES;

    constructor(
        ses: AWS.SES,
        sender: string,
        templates: Notifications.Template[] = [],
        vars: any = {}
    ) {
        super(Notifications.Channel.EMAIL, sender, templates, vars);
        this.client = ses;
    }

    async notify(receiver: string, template: string, data?: any): Promise<void> {
        const messageContent = await this.render(template, data);

        const params: AWS.SES.SendEmailRequest = {
            Source: this.sender,
            Destination: {
                ToAddresses: [receiver]
            },
            Message: {
                Body: {
                    Html: {
                        Data: messageContent,
                    }
                },
                Subject: {
                    Data: this.vars.subject ?? 'Verification Code',
                }
            }
        };

        try {
            const response = await this.client.sendEmail(params).promise();
            console.debug('Email sent successfully using SES:', response);
        } catch (error) {
            console.error('Error sending email using SES:', error);
        }
    }
}

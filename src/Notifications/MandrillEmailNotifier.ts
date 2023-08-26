import {Notifications} from ".";
import {Notifier} from "./Notifier";
import axios from "axios";

export class MandrillNotifier extends Notifier {
    protected apiKey: string;
    protected apiUrl: string = "https://mandrillapp.com/api/1.0/messages/send.json";

    constructor(
        apiKey: string,
        sender: string,
        templates: Notifications.Template[] = [],
        vars: any = {}
    ) {
        super(Notifications.Channel.EMAIL, sender, templates, vars);
        this.apiKey = apiKey;
    }

    async notify(receiver: string, template: string, data?: any): Promise<void> {
        const messageContent = await this.render(template, data);

        const payload = {
            key: this.apiKey,
            message: {
                html: messageContent,
                subject: this.vars.subject ?? 'Verification Code',
                from_email: this.sender,
                to: [
                    {
                        email: receiver
                    }
                ]
            }
        };

        try {
            const response = await axios.post(this.apiUrl, payload);
            if (response.data && response.data[0].status === "sent") {
                console.debug('Email sent successfully using Mandrill:', response.data[0]);
            } else {
                console.error('Error sending email using Mandrill:', response.data[0].reject_reason);
            }
        } catch (error) {
            console.error('Error sending email using Mandrill:', error);
        }
    }
}

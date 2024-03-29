import {Notifications} from ".";
import {Notifier} from "./Notifier";
import {Twilio} from "twilio";

export class TwilioSMSNotifier extends Notifier {
    private client: Twilio;

    constructor(
        twilio: Twilio,
        sender: string,
        templates: Notifications.Template[] = [],
        vars: any = {}
    ) {
        super(Notifications.Channel.SMS, sender, templates, vars);
        this.client = twilio;
    }

    async notify(receiver: string, template: string, data?: any): Promise<void> {
        const message = await this.render(template, data);

        try {
            const response = await this.client.messages.create({
                body: message,
                from: this.sender,
                to: receiver
            });
            console.debug(`Message sent using Twilio with SID: ${response.sid}`);
        } catch (error) {
            console.error('Error sending SMS using Twilio:', error);
        }
    }
}

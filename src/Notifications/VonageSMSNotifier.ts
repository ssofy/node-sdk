import {Notifications} from ".";
import {Notifier} from "./Notifier";
import {Vonage} from "@vonage/server-sdk";

export class VonageSMSNotifier extends Notifier {
    private client: Vonage;

    constructor(
        vonage: Vonage,
        channel: Notifications.Channel,
        sender: string,
        templates: Notifications.Template[] = [],
        vars: any = {}
    ) {
        super(channel, sender, templates, vars);
        this.client = vonage;
    }

    async notify(receiver: string, template: string, data?: any): Promise<void> {
        const messageContent = await this.render(template, data);

        try {
            const responseData: any = await this.client.sms.send({
                from: this.sender,
                to: receiver,
                text: messageContent
            });

            console.debug('SMS sent successfully using Vonage:', responseData);

        } catch (err) {
            console.error('Error sending SMS using Vonage:', err);
        }
    }
}

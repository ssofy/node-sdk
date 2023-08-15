import {Notifications} from ".";
import {Notifier} from "./Notifier";

export class ConsoleNotifier extends Notifier {
    async notify(templateName: string, format: Notifications.Format, to: string, data?: any): Promise<void> {
        const message: string = await this.render(templateName, format, data);

        console.log({
            from: this.sender,
            to: to,
            message: message,
        });
    }
}

import {Notifier} from "./Notifier";

export class ConsoleNotifier extends Notifier {
    async notify(receiver: string, template: string, data?: any): Promise<void> {
        let message: string;

        try {
            message = await this.render(template, data);
        } catch (e) {
            message = data;
        }

        console.log({
            from: this.sender,
            to: receiver,
            message: message,
        });
    }
}

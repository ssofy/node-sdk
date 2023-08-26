import {Notifier} from "./Notifier";

export class ConsoleNotifier extends Notifier {
    async notify(receiver: string, template: string, data?: any): Promise<void> {
        const message = await this.render(template, data);

        console.log({
            from: this.sender,
            to: receiver,
            message: message,
        });
    }
}

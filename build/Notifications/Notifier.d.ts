import { Notifications } from ".";
export declare abstract class Notifier {
    protected channel: Notifications.Channel;
    protected sender: string;
    protected vars: any;
    protected templates: {
        [key: string]: Notifications.Template;
    };
    constructor(channel: Notifications.Channel, sender: string, templates?: Notifications.Template[], vars?: any);
    abstract notify(receiver: string, template: string, data?: any): Promise<void>;
    protected render(template: string, data: any): Promise<string>;
    setTemplate(template: Notifications.Template | Notifications.Template[]): void;
    unsetTemplate(template: string): void;
    hasTemplate(template: string): boolean;
    clearTemplates(): void;
    private templateKey;
}

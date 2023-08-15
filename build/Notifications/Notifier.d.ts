import { Notifications } from ".";
export declare abstract class Notifier {
    protected sender: string;
    protected settings: any;
    protected templates: {
        [key: string]: Notifications.Template;
    };
    constructor(sender: string, settings?: any, templates?: Notifications.Template[]);
    abstract notify(templateName: string, format: Notifications.Format, to: string, data?: any): Promise<void>;
    protected renderHandlebars(template: string, data: any): Promise<string>;
    protected render(templateName: string, format: Notifications.Format, data: any): Promise<string>;
    setTemplate(template: Notifications.Template | Notifications.Template[]): void;
    unsetTemplate(templateName: string, format: Notifications.Format): void;
    hasTemplate(templateName: string, format: Notifications.Format): boolean;
    clearTemplates(): void;
    private templateKey;
}

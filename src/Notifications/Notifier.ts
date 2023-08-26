import {Notifications} from ".";
import {TemplateNotFoundError} from "../Errors";
import * as fs from 'fs/promises';

export abstract class Notifier {
    protected channel: Notifications.Channel;
    protected sender: string;
    protected vars: any;
    protected templates: { [key: string]: Notifications.Template } = {};

    constructor(
        channel: Notifications.Channel,
        sender: string,
        templates: Notifications.Template[] = [],
        vars: any = {}
    ) {
        this.channel = channel;
        this.sender = sender;
        this.vars = vars;

        templates.forEach((template: Notifications.Template) => {
            this.templates[this.templateKey(template.name)] = template;
        });
    }

    abstract notify(receiver: string, template: string, data?: any): Promise<void>;

    protected async render(template: string, data: any): Promise<string> {
        const tpl: Notifications.Template | undefined = this.templates[this.templateKey(template)];

        if (!tpl) {
            throw new TemplateNotFoundError(template);
        }

        const templateContent: string = await fs.readFile(tpl.path, 'utf8');

        const viewData = {
            vars: this.vars,
            data: data,
        };

        if (!tpl.engine) {
            return JSON.stringify(viewData);
        }

        return await tpl.engine.render(templateContent.trim(), viewData);
    }

    setTemplate(template: Notifications.Template | Notifications.Template[]): void {
        if (Array.isArray(template)) {
            template.forEach((template: Notifications.Template) => {
                this.templates[this.templateKey(template.name)] = template;
            })

            return;
        }

        this.templates[this.templateKey(template.name)] = template;
    }

    unsetTemplate(template: string): void {
        delete this.templates[this.templateKey(template)];
    }

    hasTemplate(template: string): boolean {
        return !!this.templates[this.templateKey(template)];
    }

    clearTemplates(): void {
        this.templates = {};
    }

    private templateKey(template: string): string {
        return template + ':' + this.channel;
    }
}

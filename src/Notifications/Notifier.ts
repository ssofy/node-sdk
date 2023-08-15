import {Notifications} from ".";
import {UnknownTemplateEngineError, TemplateNotFoundError} from "../Errors";
import Handlebars from "handlebars";
import * as fs from 'fs/promises';

export abstract class Notifier {
    protected sender: string;
    protected settings: any;
    protected templates: { [key: string]: Notifications.Template } = {};

    constructor(sender: string, settings: any = {}, templates: Notifications.Template[] = []) {
        this.sender = sender;
        this.settings = settings;

        templates.forEach((template: Notifications.Template) => {
            this.templates[this.templateKey(template.name, template.format)] = template;
        });
    }

    abstract notify(templateName: string, format: Notifications.Format, to: string, data?: any): Promise<void>;

    protected async renderHandlebars(template: string, data: any): Promise<string> {
        return Handlebars.compile(template)(data);
    }

    protected async render(templateName: string, format: Notifications.Format, data: any): Promise<string> {
        const template: Notifications.Template | undefined = this.templates[this.templateKey(templateName, format)];

        if (!template) {
            throw new TemplateNotFoundError(templateName);
        }

        const templateContent: string = await fs.readFile(template.path, 'utf8');

        const viewData = {
            settings: this.settings,
            data: data,
        };

        switch (template.engine) {
            case 'handlebars':
                return this.renderHandlebars(templateContent.trim(), viewData);
        }

        throw new UnknownTemplateEngineError(template.engine);
    }

    setTemplate(template: Notifications.Template | Notifications.Template[]): void {
        if (Array.isArray(template)) {
            template.forEach((template: Notifications.Template) => {
                this.templates[this.templateKey(template.name, template.format)] = template;
            })

            return;
        }

        this.templates[this.templateKey(template.name, template.format)] = template;
    }

    unsetTemplate(templateName: string, format: Notifications.Format): void {
        delete this.templates[this.templateKey(templateName, format)];
    }

    hasTemplate(templateName: string, format: Notifications.Format): boolean {
        return !!this.templates[this.templateKey(templateName, format)];
    }

    clearTemplates(): void {
        this.templates = {};
    }

    private templateKey(templateName: string, format: Notifications.Format): string {
        return templateName + ':' + format;
    }
}

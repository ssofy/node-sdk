import { Notifications } from ".";
export interface Template {
    name: string;
    path: string;
    engine?: Notifications.TemplateEngine;
    channel: Notifications.Channel;
}

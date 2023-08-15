import { Notifications } from ".";
export interface Template {
    name: string;
    path: string;
    format: Notifications.Format;
    engine: 'handlebars';
}

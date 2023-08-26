import {Notifications} from ".";

export interface Template {
    name: string;
    path: string;
    engine: 'handlebars';
    channel: Notifications.Channel;
}

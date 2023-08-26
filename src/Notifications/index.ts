import * as NotifierInternal from "./Notifier";
import * as ConsoleNotifierInternal from "./ConsoleNotifier";
import * as TemplateInternal from "./Template";
import * as MessageTypeInternal from "./Channel";

export namespace Notifications {
    export import Notifier = NotifierInternal.Notifier;
    export import ConsoleNotifier = ConsoleNotifierInternal.ConsoleNotifier;
    export import Channel = MessageTypeInternal.Channel;
    export type Template = TemplateInternal.Template;
}

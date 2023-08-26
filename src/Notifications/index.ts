import * as NotifierInternal from "./Notifier";
import * as ConsoleNotifierInternal from "./ConsoleNotifier";
import * as TemplateInternal from "./Template";
import * as MessageTypeInternal from "./Channel";
import * as TemplateEngineInternal from "./TemplateEngine";
import * as HandlebarsEngineInternal from "./HandlebarsEngine";

export namespace Notifications {
    export type Template = TemplateInternal.Template;
    export import Channel = MessageTypeInternal.Channel;
    export import Notifier = NotifierInternal.Notifier;
    export import ConsoleNotifier = ConsoleNotifierInternal.ConsoleNotifier;
    export import TemplateEngine = TemplateEngineInternal.TemplateEngine;
    export import HandlebarsEngine = HandlebarsEngineInternal.HandlebarsEngine;
}

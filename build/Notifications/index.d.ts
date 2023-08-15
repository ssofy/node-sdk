import * as NotifierInternal from "./Notifier";
import * as ConsoleNotifierInternal from "./ConsoleNotifier";
import * as TemplateInternal from "./Template";
import * as FormatInternal from "./Format";
export declare namespace Notifications {
    export import Notifier = NotifierInternal.Notifier;
    export import ConsoleNotifier = ConsoleNotifierInternal.ConsoleNotifier;
    export import Format = FormatInternal.Format;
    type Template = TemplateInternal.Template;
}

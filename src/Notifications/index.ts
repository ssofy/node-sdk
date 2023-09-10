import * as NotifierInternal from "./Notifier";
import * as ConsoleNotifierInternal from "./ConsoleNotifier";
import * as TemplateInternal from "./Template";
import * as MessageTypeInternal from "./Channel";
import * as TemplateEngineInternal from "./TemplateEngine";
import * as HandlebarsEngineInternal from "./HandlebarsEngine";
import * as TwilioSMSNotifierInternal from "./TwilioSMSNotifier";
import * as VonageSMSNotifierInternal from "./VonageSMSNotifier";
import * as NodemailerEmailNotifierInternal from "./NodemailerEmailNotifier";
import * as SendGridEmailNotifierInternal from "./SendGridEmailNotifier";
import * as MailchimpEmailNotifierInternal from "./MailchimpEmailNotifier";
import * as MailgunEmailNotifierInternal from "./MailgunEmailNotifier";
import * as SESEmailNotifierInternal from "./SESEmailNotifier";

export namespace Notifications {
    export type Template = TemplateInternal.Template;
    export import Channel = MessageTypeInternal.Channel;
    export import Notifier = NotifierInternal.Notifier;
    export import ConsoleNotifier = ConsoleNotifierInternal.ConsoleNotifier;
    export import TemplateEngine = TemplateEngineInternal.TemplateEngine;
    export import HandlebarsEngine = HandlebarsEngineInternal.HandlebarsEngine;
    export import TwilioSMSNotifier = TwilioSMSNotifierInternal.TwilioSMSNotifier;
    export import VonageSMSNotifier = VonageSMSNotifierInternal.VonageSMSNotifier;
    export import NodemailerEmailNotifier = NodemailerEmailNotifierInternal.NodemailerEmailNotifier;
    export import SendGridEmailNotifier = SendGridEmailNotifierInternal.SendGridEmailNotifier;
    export import MailchimpEmailNotifier = MailchimpEmailNotifierInternal.MailchimpEmailNotifier;
    export import MailgunEmailNotifier = MailgunEmailNotifierInternal.MailgunEmailNotifier;
    export import SESEmailNotifier = SESEmailNotifierInternal.SESEmailNotifier;
}

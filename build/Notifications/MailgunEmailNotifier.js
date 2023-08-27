"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailgunEmailNotifier = void 0;
const _1 = require(".");
const Notifier_1 = require("./Notifier");
class MailgunEmailNotifier extends Notifier_1.Notifier {
    constructor(mailgun, domain, sender, templates = [], vars = {}) {
        super(_1.Notifications.Channel.EMAIL, sender, templates, vars);
        this.client = mailgun;
        this.domain = domain;
    }
    notify(receiver, template, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const messageContent = yield this.render(template, data);
            const messageData = {
                from: this.sender,
                to: receiver,
                subject: (_a = this.vars.subject) !== null && _a !== void 0 ? _a : 'Verification Code',
                html: messageContent,
            };
            try {
                const response = yield this.client.messages.create(this.domain, messageData);
                console.log('Email sent successfully using Mailgun:', response);
            }
            catch (error) {
                console.error('Error sending email using Mailgun:', error);
            }
        });
    }
}
exports.MailgunEmailNotifier = MailgunEmailNotifier;

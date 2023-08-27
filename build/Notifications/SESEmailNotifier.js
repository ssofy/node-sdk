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
exports.SESEmailNotifier = void 0;
const _1 = require(".");
const Notifier_1 = require("./Notifier");
class SESEmailNotifier extends Notifier_1.Notifier {
    constructor(ses, sender, templates = [], vars = {}) {
        super(_1.Notifications.Channel.EMAIL, sender, templates, vars);
        this.client = ses;
    }
    notify(receiver, template, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const messageContent = yield this.render(template, data);
            const params = {
                Source: this.sender,
                Destination: {
                    ToAddresses: [receiver]
                },
                Message: {
                    Body: {
                        Html: {
                            Data: messageContent,
                        }
                    },
                    Subject: {
                        Data: (_a = this.vars.subject) !== null && _a !== void 0 ? _a : 'Verification Code',
                    }
                }
            };
            try {
                const response = yield this.client.sendEmail(params).promise();
                console.debug('Email sent successfully using SES:', response);
            }
            catch (error) {
                console.error('Error sending email using SES:', error);
            }
        });
    }
}
exports.SESEmailNotifier = SESEmailNotifier;

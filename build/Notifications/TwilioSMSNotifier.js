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
exports.TwilioSMSNotifier = void 0;
const _1 = require(".");
const Notifier_1 = require("./Notifier");
class TwilioSMSNotifier extends Notifier_1.Notifier {
    constructor(twilio, sender, templates = [], vars = {}) {
        super(_1.Notifications.Channel.SMS, sender, templates, vars);
        this.client = twilio;
    }
    notify(receiver, template, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.render(template, data);
            yield this.client.messages.create({
                body: message,
                from: this.sender,
                to: receiver
            }).then(message => {
                console.debug(`Message sent using Twilio with SID: ${message.sid}`);
            }).catch(error => {
                console.error('Error sending SMS using Twilio:', error);
            });
        });
    }
}
exports.TwilioSMSNotifier = TwilioSMSNotifier;

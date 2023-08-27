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
exports.VonageSMSNotifier = void 0;
const Notifier_1 = require("./Notifier");
class VonageSMSNotifier extends Notifier_1.Notifier {
    constructor(vonage, channel, sender, templates = [], vars = {}) {
        super(channel, sender, templates, vars);
        this.client = vonage;
    }
    notify(receiver, template, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageContent = yield this.render(template, data);
            try {
                const responseData = yield this.client.sms.send({
                    from: this.sender,
                    to: receiver,
                    text: messageContent
                });
                console.debug('SMS sent successfully using Vonage:', responseData);
            }
            catch (err) {
                console.error('Error sending SMS using Vonage:', err);
            }
        });
    }
}
exports.VonageSMSNotifier = VonageSMSNotifier;

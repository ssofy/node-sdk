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
exports.NodemailerEmailNotifier = void 0;
const Notifier_1 = require("./Notifier");
class NodemailerEmailNotifier extends Notifier_1.Notifier {
    constructor(transporter, channel, sender, templates = [], vars = {}) {
        super(channel, sender, templates, vars);
        this.client = transporter;
    }
    notify(receiver, template, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const messageContent = yield this.render(template, data);
            const mailOptions = {
                to: receiver,
                from: this.sender,
                subject: (_a = this.vars.subject) !== null && _a !== void 0 ? _a : 'Verification Code',
                html: messageContent,
            };
            try {
                const info = yield this.client.sendMail(mailOptions);
                console.debug('Message sent successfully using Nodemailer:', info.messageId);
            }
            catch (err) {
                console.error('Error sending email using Nodemailer:', err);
            }
        });
    }
}
exports.NodemailerEmailNotifier = NodemailerEmailNotifier;

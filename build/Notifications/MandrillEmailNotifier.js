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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MandrillNotifier = void 0;
const _1 = require(".");
const Notifier_1 = require("./Notifier");
const axios_1 = __importDefault(require("axios"));
class MandrillNotifier extends Notifier_1.Notifier {
    constructor(apiKey, sender, templates = [], vars = {}) {
        super(_1.Notifications.Channel.EMAIL, sender, templates, vars);
        this.apiUrl = "https://mandrillapp.com/api/1.0/messages/send.json";
        this.apiKey = apiKey;
    }
    notify(receiver, template, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const messageContent = yield this.render(template, data);
            const payload = {
                key: this.apiKey,
                message: {
                    html: messageContent,
                    subject: (_a = this.vars.subject) !== null && _a !== void 0 ? _a : 'Verification Code',
                    from_email: this.sender,
                    to: [
                        {
                            email: receiver
                        }
                    ]
                }
            };
            try {
                const response = yield axios_1.default.post(this.apiUrl, payload);
                if (response.data && response.data[0].status === "sent") {
                    console.debug('Email sent successfully using Mandrill:', response.data[0]);
                }
                else {
                    console.error('Error sending email using Mandrill:', response.data[0].reject_reason);
                }
            }
            catch (error) {
                console.error('Error sending email using Mandrill:', error);
            }
        });
    }
}
exports.MandrillNotifier = MandrillNotifier;

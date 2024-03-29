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
exports.ConsoleNotifier = void 0;
const Notifier_1 = require("./Notifier");
class ConsoleNotifier extends Notifier_1.Notifier {
    notify(receiver, template, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.render(template, data);
            console.log({
                from: this.sender,
                to: receiver,
                message: message,
            });
        });
    }
}
exports.ConsoleNotifier = ConsoleNotifier;

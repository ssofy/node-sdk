"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Notifier = void 0;
const Errors_1 = require("../Errors");
const fs = __importStar(require("fs/promises"));
class Notifier {
    constructor(channel, sender, templates = [], vars = {}) {
        this.templates = {};
        this.channel = channel;
        this.sender = sender;
        this.vars = vars;
        templates.forEach((template) => {
            this.templates[this.templateKey(template.name)] = template;
        });
    }
    render(template, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tpl = this.templates[this.templateKey(template)];
            if (!tpl) {
                throw new Errors_1.TemplateNotFoundError(template);
            }
            const templateContent = yield fs.readFile(tpl.path, 'utf8');
            const viewData = {
                vars: this.vars,
                data: data,
            };
            if (!tpl.engine) {
                return JSON.stringify(viewData);
            }
            return yield tpl.engine.render(templateContent.trim(), viewData);
        });
    }
    setTemplate(template) {
        if (Array.isArray(template)) {
            template.forEach((template) => {
                this.templates[this.templateKey(template.name)] = template;
            });
            return;
        }
        this.templates[this.templateKey(template.name)] = template;
    }
    unsetTemplate(template) {
        delete this.templates[this.templateKey(template)];
    }
    hasTemplate(template) {
        return !!this.templates[this.templateKey(template)];
    }
    clearTemplates() {
        this.templates = {};
    }
    setVar(name, value) {
        this.vars[name] = value;
    }
    unsetVar(name) {
        delete this.vars[name];
    }
    hasVar(name) {
        return !!this.vars[name];
    }
    clearVars() {
        this.vars = {};
    }
    templateKey(template) {
        return template + ':' + this.channel;
    }
}
exports.Notifier = Notifier;

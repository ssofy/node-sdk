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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifier = void 0;
const Errors_1 = require("../Errors");
const handlebars_1 = __importDefault(require("handlebars"));
const fs = __importStar(require("fs/promises"));
class Notifier {
    constructor(sender, settings = {}, templates = []) {
        this.templates = {};
        this.sender = sender;
        this.settings = settings;
        templates.forEach((template) => {
            this.templates[this.templateKey(template.name, template.format)] = template;
        });
    }
    renderHandlebars(template, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return handlebars_1.default.compile(template)(data);
        });
    }
    render(templateName, format, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = this.templates[this.templateKey(templateName, format)];
            if (!template) {
                throw new Errors_1.TemplateNotFoundError(templateName);
            }
            const templateContent = yield fs.readFile(template.path, 'utf8');
            const viewData = {
                settings: this.settings,
                data: data,
            };
            switch (template.engine) {
                case 'handlebars':
                    return this.renderHandlebars(templateContent.trim(), viewData);
            }
            throw new Errors_1.UnknownTemplateEngineError(template.engine);
        });
    }
    setTemplate(template) {
        if (Array.isArray(template)) {
            template.forEach((template) => {
                this.templates[this.templateKey(template.name, template.format)] = template;
            });
            return;
        }
        this.templates[this.templateKey(template.name, template.format)] = template;
    }
    unsetTemplate(templateName, format) {
        delete this.templates[this.templateKey(templateName, format)];
    }
    hasTemplate(templateName, format) {
        return !!this.templates[this.templateKey(templateName, format)];
    }
    clearTemplates() {
        this.templates = {};
    }
    templateKey(templateName, format) {
        return templateName + ':' + format;
    }
}
exports.Notifier = Notifier;

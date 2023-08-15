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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifier = void 0;
var Errors_1 = require("../Errors");
var handlebars_1 = __importDefault(require("handlebars"));
var fs = __importStar(require("fs/promises"));
var Notifier = /** @class */ (function () {
    function Notifier(sender, settings, templates) {
        if (settings === void 0) { settings = {}; }
        if (templates === void 0) { templates = []; }
        var _this = this;
        this.templates = {};
        this.sender = sender;
        this.settings = settings;
        templates.forEach(function (template) {
            _this.templates[_this.templateKey(template.name, template.format)] = template;
        });
    }
    Notifier.prototype.renderHandlebars = function (template, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, handlebars_1.default.compile(template)(data)];
            });
        });
    };
    Notifier.prototype.render = function (templateName, format, data) {
        return __awaiter(this, void 0, void 0, function () {
            var template, templateContent, viewData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        template = this.templates[this.templateKey(templateName, format)];
                        if (!template) {
                            throw new Errors_1.TemplateNotFoundError(templateName);
                        }
                        return [4 /*yield*/, fs.readFile(template.path, 'utf8')];
                    case 1:
                        templateContent = _a.sent();
                        viewData = {
                            settings: this.settings,
                            data: data,
                        };
                        switch (template.engine) {
                            case 'handlebars':
                                return [2 /*return*/, this.renderHandlebars(templateContent.trim(), viewData)];
                        }
                        throw new Errors_1.UnknownTemplateEngineError(template.engine);
                }
            });
        });
    };
    Notifier.prototype.setTemplate = function (template) {
        var _this = this;
        if (Array.isArray(template)) {
            template.forEach(function (template) {
                _this.templates[_this.templateKey(template.name, template.format)] = template;
            });
            return;
        }
        this.templates[this.templateKey(template.name, template.format)] = template;
    };
    Notifier.prototype.unsetTemplate = function (templateName, format) {
        delete this.templates[this.templateKey(templateName, format)];
    };
    Notifier.prototype.hasTemplate = function (templateName, format) {
        return !!this.templates[this.templateKey(templateName, format)];
    };
    Notifier.prototype.clearTemplates = function () {
        this.templates = {};
    };
    Notifier.prototype.templateKey = function (templateName, format) {
        return templateName + ':' + format;
    };
    return Notifier;
}());
exports.Notifier = Notifier;

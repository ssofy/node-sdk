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
exports.FileStorage = void 0;
var util_1 = require("util");
var fs_1 = require("fs");
var glob_1 = require("glob");
var path_1 = __importDefault(require("path"));
var FileStorage = /** @class */ (function () {
    function FileStorage(storagePath) {
        this.storagePath = storagePath;
        this.glob = (0, util_1.promisify)(glob_1.glob);
    }
    FileStorage.prototype.put = function (key, value, ttl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.writeFile(this.getFilename(key) + ".".concat(ttl || 0), value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FileStorage.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var files, filename, ttl, _a, _b, _c, result;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.glob(this.getFilename(key) + '*')];
                    case 1:
                        files = _d.sent();
                        if (files.length <= 0) {
                            return [2 /*return*/, null];
                        }
                        filename = files[0];
                        ttl = Number.parseInt(filename.substring(filename.indexOf('.') + 1));
                        _a = ttl > 0;
                        if (!_a) return [3 /*break*/, 3];
                        _b = (new Date()).getTime() / 1000;
                        _c = Date.bind;
                        return [4 /*yield*/, fs_1.promises.stat(filename)];
                    case 2:
                        _a = _b >= (new (_c.apply(Date, [void 0, (_d.sent()).mtime]))().getTime() / 1000) + ttl;
                        _d.label = 3;
                    case 3:
                        if (!_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.delete(key)];
                    case 4:
                        _d.sent();
                        return [2 /*return*/, null];
                    case 5: return [4 /*yield*/, fs_1.promises.readFile(filename)];
                    case 6:
                        result = _d.sent();
                        return [2 /*return*/, result.toString()];
                }
            });
        });
    };
    FileStorage.prototype.delete = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var files, _i, files_1, filename;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.glob(this.getFilename(key) + '*')];
                    case 1:
                        files = _a.sent();
                        _i = 0, files_1 = files;
                        _a.label = 2;
                    case 2:
                        if (!(_i < files_1.length)) return [3 /*break*/, 5];
                        filename = files_1[_i];
                        return [4 /*yield*/, fs_1.promises.rm(filename)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FileStorage.prototype.flushAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var files, _i, files_2, filename;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.glob(path_1.default.join(this.storagePath, '*.*'))];
                    case 1:
                        files = _a.sent();
                        _i = 0, files_2 = files;
                        _a.label = 2;
                    case 2:
                        if (!(_i < files_2.length)) return [3 /*break*/, 5];
                        filename = files_2[_i];
                        return [4 /*yield*/, fs_1.promises.rm(filename)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FileStorage.prototype.cleanup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.readdir(this.storagePath)];
                    case 1:
                        (_a.sent()).map(function (filename) { return __awaiter(_this, void 0, void 0, function () {
                            var ttl, _a, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        if (filename.startsWith('.')) {
                                            return [2 /*return*/];
                                        }
                                        ttl = Number.parseInt(filename.substring(filename.indexOf('.') + 1));
                                        filename = path_1.default.join(this.storagePath, filename);
                                        _a = ttl > 0;
                                        if (!_a) return [3 /*break*/, 2];
                                        _b = (new Date()).getTime() / 1000;
                                        _c = Date.bind;
                                        return [4 /*yield*/, fs_1.promises.stat(filename)];
                                    case 1:
                                        _a = _b >= (new (_c.apply(Date, [void 0, (_d.sent()).mtime]))().getTime() / 1000) + ttl;
                                        _d.label = 2;
                                    case 2:
                                        if (!_a) return [3 /*break*/, 4];
                                        return [4 /*yield*/, fs_1.promises.rm(filename)];
                                    case 3:
                                        _d.sent();
                                        _d.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    FileStorage.prototype.getFilename = function (key) {
        return path_1.default.join(this.storagePath, key.replace(/\//g, ':'));
    };
    return FileStorage;
}());
exports.FileStorage = FileStorage;

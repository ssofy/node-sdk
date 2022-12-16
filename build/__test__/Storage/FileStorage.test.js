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
var fs_1 = __importDefault(require("fs"));
var FileStorage_1 = require("../../Storage/FileStorage");
describe('FileStorage Test', function () {
    var storagePath = fs_1.default.mkdtempSync('/tmp/');
    var cache = new FileStorage_1.FileStorage(storagePath);
    test('put and get simple key', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, cache.put('test', 'something')];
                case 1:
                    _b.sent();
                    _a = expect;
                    return [4 /*yield*/, cache.get('test')];
                case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()]).toBe('something')];
            }
        });
    }); });
    test('test get and delete with key containing path', function () { return __awaiter(void 0, void 0, void 0, function () {
        var promises, _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    promises = [];
                    return [4 /*yield*/, cache.put('path/test', 'something')];
                case 1:
                    _g.sent();
                    _b = (_a = promises).push;
                    _c = expect;
                    return [4 /*yield*/, cache.get('test')];
                case 2:
                    _b.apply(_a, [_c.apply(void 0, [_g.sent()]).toBe('something')]);
                    return [4 /*yield*/, cache.delete('path/test')];
                case 3:
                    _g.sent();
                    _e = (_d = promises).push;
                    _f = expect;
                    return [4 /*yield*/, cache.get('path/test')];
                case 4:
                    _e.apply(_d, [_f.apply(void 0, [_g.sent()]).toBeNull()]);
                    return [2 /*return*/, Promise.all(promises)];
            }
        });
    }); });
    test('expiration', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, cache.put('test-ex', 'something', 2)];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 2:
                    _c.sent();
                    _a = expect;
                    return [4 /*yield*/, cache.get('test-ex')];
                case 3:
                    _a.apply(void 0, [_c.sent()]).toBe('something');
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 4:
                    _c.sent();
                    _b = expect;
                    return [4 /*yield*/, cache.get('test-ex')];
                case 5:
                    _b.apply(void 0, [_c.sent()]).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    test('deletion', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, cache.put('test-deletable', 'something')];
                case 1:
                    _c.sent();
                    _a = expect;
                    return [4 /*yield*/, cache.get('test-deletable')];
                case 2:
                    _a.apply(void 0, [_c.sent()]).toBe('something');
                    return [4 /*yield*/, cache.delete('test-deletable')];
                case 3:
                    _c.sent();
                    _b = expect;
                    return [4 /*yield*/, cache.get('test-deletable')];
                case 4:
                    _b.apply(void 0, [_c.sent()]).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    test('flush all', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, cache.put('test-flushable', 'something')];
                case 1:
                    _c.sent();
                    _a = expect;
                    return [4 /*yield*/, cache.get('test-flushable')];
                case 2:
                    _a.apply(void 0, [_c.sent()]).toBe('something');
                    return [4 /*yield*/, cache.flushAll()];
                case 3:
                    _c.sent();
                    _b = expect;
                    return [4 /*yield*/, cache.get('test-flushable')];
                case 4:
                    _b.apply(void 0, [_c.sent()]).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
});

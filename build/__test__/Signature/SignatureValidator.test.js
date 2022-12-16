"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
Object.defineProperty(exports, "__esModule", { value: true });
var SignatureValidator_1 = require("../../SignatureValidator");
describe('SignatureValidator Test', function () {
    var validator = new SignatureValidator_1.SignatureValidator({
        'key': 'cf47d697-cc0b-4262-8329-78a0995e6fd0',
        'secret': 'lXp2rNYg8ht75l2l1vxNGNz2PWzZ7h6K',
    });
    var cases = [
        {
            url: 'https://example.com/external/ssofy/client',
            params: __assign({}, {
                id: 'test-client',
                name: 'Test Client',
                secret: 'cvg7oVzKM6g6Z4Nm',
                redirect_uris: ['*'],
            }),
            signature: Buffer.from(JSON.stringify({
                hash: 'c6f9f6eb5868af271bcaae915a515bbefb5e46f4e87a41596270b357b5627f64',
                salt: 'Py2BZIGgY',
            }), 'utf8').toString('base64'),
        },
        {
            url: 'https://example.com/external/ssofy/scopes',
            params: {
                scopes: [
                    {
                        id: '*',
                        title: 'everything',
                    },
                    {
                        id: 'profile',
                        title: 'profile',
                    }
                ],
            },
            signature: Buffer.from(JSON.stringify({
                hash: 'c0100920478966fbd8650b10e98ad552a2787a97b51ff77bf4339daa218ddc90',
                salt: 'qHzBkp',
            }), 'utf8').toString('base64'),
        },
        {
            url: 'https://example.com/external/ssofy/user',
            params: {
                user: {
                    id: 'test-user',
                    display_name: 'test@example.com',
                },
            },
            signature: Buffer.from(JSON.stringify({
                hash: '599f54743dde85838520851fc550285bc0d8365bf02c6d2f9a96da635dbd6a72',
                salt: 'y4HWL',
            }), 'utf8').toString('base64'),
        },
    ];
    test.each(cases)('Signature must match $signature', function (testCase) { return __awaiter(void 0, void 0, void 0, function () {
        var ok;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validator.verifyBase64Signature(testCase.url, testCase.params, testCase.signature)];
                case 1:
                    ok = _a.sent();
                    return [2 /*return*/, expect(ok).toBeTruthy()];
            }
        });
    }); });
});

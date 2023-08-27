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
const randomString_1 = __importDefault(require("./randomString"));
const SignatureGenerator_1 = require("../SignatureGenerator");
exports.default = (secret, path, data) => __awaiter(void 0, void 0, void 0, function* () {
    const signatureGenerator = new SignatureGenerator_1.SignatureGenerator();
    const salt = (0, randomString_1.default)(Math.floor(Math.random() * (32 - 16 + 1)) + 16);
    path = path.startsWith('/') ? 'http://localhost' + path : path;
    const signatureValue = yield signatureGenerator.generate(path, data, secret, salt);
    return Buffer.from(JSON.stringify(signatureValue)).toString('base64');
});

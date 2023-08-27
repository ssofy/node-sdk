"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
exports.default = (digits) => {
    let result = '';
    while (result.length < digits) {
        result += (0, crypto_1.randomInt)(0, 9).toString();
    }
    return result;
};

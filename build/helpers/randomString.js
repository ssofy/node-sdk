"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
exports.default = (length) => {
    return (0, crypto_1.randomBytes)(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

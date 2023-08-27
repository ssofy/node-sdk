"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (phone) => {
    return '*'.repeat(phone.length - 2) + phone.slice(-2);
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        return email;
    }
    const [first, last] = email.split('@');
    const firstPart = '*'.repeat(first.length - 2) + first.slice(-2);
    const lastParts = last.split('.');
    const lastDomain = lastParts[0].charAt(0) + '*'.repeat(lastParts[0].length - 1);
    return `${firstPart}@${lastDomain}.${lastParts[1]}`;
};

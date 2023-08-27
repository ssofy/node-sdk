"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (ref, obj) => {
    const result = {};
    for (const key in obj) {
        if (key in ref) {
            result[key] = obj[key];
        }
    }
    return result;
};

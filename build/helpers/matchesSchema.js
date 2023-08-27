"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (obj, schema) => {
    for (const key in schema) {
        const type = schema[key];
        const isOptional = type.endsWith('?');
        const expectedType = isOptional ? type.slice(0, -1) : type;
        if (isOptional) {
            if (obj[key] === undefined) {
                continue;
            }
        }
        if (!obj.hasOwnProperty(key)) {
            return false;
        }
        if (typeof obj[key] !== expectedType) {
            return false;
        }
    }
    return true;
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (value) => {
    return (value instanceof Array) && value.constructor !== Object;
};

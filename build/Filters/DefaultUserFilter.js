"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultUserFilter = void 0;
class DefaultUserFilter {
    filter(user, scopes) {
        return Promise.resolve(user);
    }
}
exports.DefaultUserFilter = DefaultUserFilter;

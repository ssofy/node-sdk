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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultUserTransformer = void 0;
class DefaultUserTransformer {
    constructor(columnMap = {}, additionalColumns = []) {
        this.columns = columnMap;
        this.additionalColumns = additionalColumns;
    }
    transform(user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let metadata = this.get(user, 'metadata', {});
            if (typeof metadata === 'string') {
                metadata = (_a = JSON.parse(metadata)) !== null && _a !== void 0 ? _a : {};
            }
            return Object.assign(Object.assign({}, metadata), { id: this.get(user, 'id', '').toString(), hash: this.get(user, 'hash', '').toString(), name: this.get(user, 'name'), display_name: this.get(user, 'display_name'), picture: this.get(user, 'picture'), username: this.get(user, 'username'), email: this.get(user, 'email'), email_verified: !!this.get(user, 'email_verified_at'), phone: this.get(user, 'phone'), phone_verified: !!this.get(user, 'phone_verified_at'), additional: this.additionalColumns.reduce((obj, key) => (Object.assign(Object.assign({}, obj), { [key]: user[key] })), {}) });
        });
    }
    get(user, column, defaultVal = null) {
        var _a;
        const mappedColumn = this.columns[column];
        if ((!mappedColumn || mappedColumn.trim() === '') && !user[column]) {
            return defaultVal;
        }
        return (_a = user[mappedColumn !== null && mappedColumn !== void 0 ? mappedColumn : column]) !== null && _a !== void 0 ? _a : defaultVal;
    }
}
exports.DefaultUserTransformer = DefaultUserTransformer;

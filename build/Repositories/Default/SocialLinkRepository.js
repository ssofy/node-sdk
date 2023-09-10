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
exports.SocialLinkRepository = void 0;
class SocialLinkRepository {
    constructor(connection, schema, columnMap = {}) {
        this.connection = connection;
        this.schema = schema;
        this.columns = columnMap;
    }
    getUserId(provider, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = {};
            this.objectSet(criteria, 'provider', provider);
            this.objectSet(criteria, 'identifier', identifier);
            const links = yield this.connection.query(this.schema, criteria);
            if (links.length <= 0) {
                return null;
            }
            return this.objectGet(links[0], 'user_id');
        });
    }
    link(provider, identifier, userId) {
        const item = {};
        this.objectSet(item, 'provider', provider);
        this.objectSet(item, 'identifier', identifier);
        this.objectSet(item, 'user_id', userId);
        let criteria = {};
        this.objectSet(criteria, 'provider', provider);
        this.objectSet(criteria, 'identifier', identifier);
        this.objectSet(criteria, 'user_id', userId);
        return this.connection.upsert(this.schema, criteria, item);
    }
    objectGet(obj, column, alternative) {
        var _a;
        const realColumn = this.column(column);
        if (!obj.hasOwnProperty(realColumn)) {
            return alternative;
        }
        return (_a = obj[realColumn]) !== null && _a !== void 0 ? _a : alternative;
    }
    objectSet(obj, column, value) {
        obj[this.column(column)] = value;
    }
    column(column) {
        var _a;
        return (_a = this.columns[column]) !== null && _a !== void 0 ? _a : column;
    }
}
exports.SocialLinkRepository = SocialLinkRepository;

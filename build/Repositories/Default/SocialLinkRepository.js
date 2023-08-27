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
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = {};
            criteria[(_a = this.columns.provider) !== null && _a !== void 0 ? _a : 'provider'] = provider;
            criteria[(_b = this.columns.identifier) !== null && _b !== void 0 ? _b : 'identifier'] = identifier;
            const links = yield this.connection.query(this.schema, criteria);
            if (links.length <= 0) {
                return null;
            }
            return links[0][(_c = this.columns.user_id) !== null && _c !== void 0 ? _c : 'user_id'];
        });
    }
    link(provider, identifier, userId) {
        var _a, _b, _c, _d, _e, _f;
        const item = {};
        item[(_a = this.columns.provider) !== null && _a !== void 0 ? _a : 'provider'] = provider;
        item[(_b = this.columns.identifier) !== null && _b !== void 0 ? _b : 'identifier'] = identifier;
        item[(_c = this.columns.user_id) !== null && _c !== void 0 ? _c : 'user_id'] = userId;
        let criteria = {};
        criteria[(_d = this.columns.provider) !== null && _d !== void 0 ? _d : 'provider'] = provider;
        criteria[(_e = this.columns.identifier) !== null && _e !== void 0 ? _e : 'identifier'] = identifier;
        criteria[(_f = this.columns.user_id) !== null && _f !== void 0 ? _f : 'user_id'] = userId;
        return this.connection.upsert(this.schema, criteria, item);
    }
}
exports.SocialLinkRepository = SocialLinkRepository;

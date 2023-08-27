"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserRepository = void 0;
const helpers_1 = require("../../helpers");
const crypto = __importStar(require("crypto"));
class UserRepository {
    constructor(connection, schema, tokenStorage, socialLinkRepository, userTransformer, columnMap = {}) {
        this.connection = connection;
        this.schema = schema;
        this.tokenStorage = tokenStorage;
        this.socialLinkRepository = socialLinkRepository;
        this.userTransformer = userTransformer;
        this.columns = columnMap;
    }
    find(field, value, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = {};
            criteria[field] = value;
            const users = yield this.connection.query(this.schema, criteria);
            if (users.length <= 0) {
                return null;
            }
            return this.userTransformer.transform(users[0]);
        });
    }
    findById(id, ip) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = {};
            criteria[(_a = this.columns.id) !== null && _a !== void 0 ? _a : 'id'] = id;
            const users = yield this.connection.query(this.schema, criteria);
            if (users.length <= 0) {
                return null;
            }
            return this.userTransformer.transform(users[0]);
        });
    }
    findByToken(token, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = this.tokenStorageKey(token);
            const userId = yield this.tokenStorage.get(key);
            if (userId === null) {
                return null;
            }
            return this.findById(userId);
        });
    }
    findBySocialLinkOrCreate(provider, user, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield this.socialLinkRepository.getUserId(provider, user.id);
            if (userId) {
                const found = yield this.findById(userId, ip);
                if (found) {
                    return found;
                }
            }
            const created = yield this.findByEmailOrCreate(user, undefined, ip);
            yield this.socialLinkRepository.link(provider, user.id, created.id);
            return created;
        });
    }
    findByEmailOrCreate(user, password, ip) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.find('email', (_a = user.email) !== null && _a !== void 0 ? _a : '', ip);
            if (existingUser) {
                return existingUser;
            }
            if (((_b = user.name) === null || _b === void 0 ? void 0 : _b.trim()) === '') {
                user.name = (_c = user.email) === null || _c === void 0 ? void 0 : _c.split('@')[0];
            }
            return this.create(user, password, ip);
        });
    }
    create(user, password, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAttributes = user;
            delete userAttributes.id;
            if (!password) {
                password = helpers_1.Helpers.randomString(16);
            }
            userAttributes.password = this.makePassword(password);
            const item = this.makeUserItem(userAttributes);
            yield this.connection.insert(this.schema, item);
            return this.userTransformer.transform(item);
        });
    }
    update(user, ip) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const userAttributes = user;
            let criteria = {};
            criteria[(_a = this.columns.id) !== null && _a !== void 0 ? _a : 'id'] = user.id;
            let item = this.makeUserItem(userAttributes);
            delete item[(_b = this.columns.id) !== null && _b !== void 0 ? _b : 'id'];
            yield this.connection.update(this.schema, criteria, item);
            return this.userTransformer.transform(item);
        });
    }
    createToken(userId, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = helpers_1.Helpers.randomString(32);
            yield this.tokenStorage.put(this.tokenStorageKey(token), userId, ttl);
            return {
                token: token,
                ttl: ttl !== null && ttl !== void 0 ? ttl : 60,
            };
        });
    }
    deleteToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokenStorage.delete(this.tokenStorageKey(token));
        });
    }
    verifyPassword(userId, password, ip) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = {};
            criteria[(_a = this.columns.id) !== null && _a !== void 0 ? _a : 'id'] = userId;
            const users = yield this.connection.query(this.schema, criteria);
            if (users.length <= 0) {
                return false;
            }
            const user = users[0];
            if (!password) {
                return user[(_b = this.columns.password) !== null && _b !== void 0 ? _b : 'password'] === null;
            }
            return user[(_c = this.columns.password) !== null && _c !== void 0 ? _c : 'password'] === this.makePassword(password);
        });
    }
    updatePassword(userId, password, ip) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = {};
            criteria[(_a = this.columns.id) !== null && _a !== void 0 ? _a : 'id'] = userId;
            let item = {};
            item[(_b = this.columns.password) !== null && _b !== void 0 ? _b : 'password'] = this.makePassword(password);
            return this.connection.update(this.schema, criteria, item);
        });
    }
    makeUserItem(userAttributes) {
        var _a, _b, _c, _d, _e, _f;
        if (!userAttributes[(_a = this.columns['name']) !== null && _a !== void 0 ? _a : 'name'] || userAttributes[(_b = this.columns['name']) !== null && _b !== void 0 ? _b : 'name'].trim() === '') {
            userAttributes[(_c = this.columns['name']) !== null && _c !== void 0 ? _c : 'name'] = (((_d = userAttributes.given_name) === null || _d === void 0 ? void 0 : _d.toString().trim()) + ' ' + ((_e = userAttributes.family_name) === null || _e === void 0 ? void 0 : _e.toString().trim())).trim();
        }
        let item = Object.keys(userAttributes).reduce((acc, key) => {
            if (this.columns[key]) {
                acc[this.columns[key]] = userAttributes[key];
            }
            return acc;
        }, {});
        if (this.columns.metadata) {
            item[this.columns.metadata] = userAttributes;
            delete item[this.columns.metadata][(_f = this.columns.password) !== null && _f !== void 0 ? _f : 'password'];
        }
        return item;
    }
    makePassword(password) {
        const hash = crypto.createHash('sha256');
        hash.update(password);
        return hash.digest('hex');
    }
    tokenStorageKey(token) {
        return `user:token:${token}`;
    }
}
exports.UserRepository = UserRepository;

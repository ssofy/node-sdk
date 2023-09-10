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
            this.objectSet(criteria, field, value);
            const users = yield this.connection.query(this.schema, criteria);
            if (users.length <= 0) {
                return null;
            }
            return this.userTransformer.transform(users[0]);
        });
    }
    findById(id, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = {};
            this.objectSet(criteria, 'id', id);
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
            this.objectDelete(userAttributes, 'id');
            if (!password) {
                password = helpers_1.Helpers.randomString(16);
            }
            this.objectSet(userAttributes, 'password', this.makePassword(password));
            const item = this.makeUserItem(userAttributes);
            yield this.connection.insert(this.schema, item);
            return this.userTransformer.transform(item);
        });
    }
    update(user, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAttributes = user;
            let criteria = {};
            this.objectSet(criteria, 'id', user.id);
            let item = this.makeUserItem(userAttributes);
            this.objectDelete(item, 'id');
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
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = {};
            this.objectSet(criteria, 'id', userId);
            const users = yield this.connection.query(this.schema, criteria);
            if (users.length <= 0) {
                return false;
            }
            const user = users[0];
            if (!password) {
                return this.objectGet(user, 'password') === null;
            }
            return this.objectGet(user, 'password') === this.makePassword(password);
        });
    }
    updatePassword(userId, password, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = {};
            this.objectSet(criteria, 'id', userId);
            let item = {};
            this.objectSet(item, 'password', this.makePassword(password));
            return this.connection.update(this.schema, criteria, item);
        });
    }
    makeUserItem(userAttributes) {
        if (this.objectGet(userAttributes, 'name', '').trim() === '') {
            this.objectSet(userAttributes, 'name', (this.objectGet(userAttributes, 'given_name', '').trim() + ' ' + this.objectGet(userAttributes, 'family_name', '')).trim());
        }
        let item = Object.keys(userAttributes).reduce((acc, key) => {
            if (this.columns[key]) {
                this.objectSet(acc, key, userAttributes[key]);
            }
            return acc;
        }, {});
        if (this.columns.metadata) {
            this.objectSet(item, 'metadata', userAttributes);
            this.objectDelete(this.objectGet(item, 'metadata'), 'password');
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
    objectDelete(obj, column) {
        delete obj[this.column(column)];
    }
    column(column) {
        var _a;
        return (_a = this.columns[column]) !== null && _a !== void 0 ? _a : column;
    }
}
exports.UserRepository = UserRepository;

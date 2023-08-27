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
exports.SequelizeConnection = void 0;
const Connection_1 = require("./Connection");
class SequelizeConnection extends Connection_1.Connection {
    constructor(sequelize) {
        super();
        this.sequelize = sequelize;
    }
    query(schema, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema.findAll({ where: criteria });
        });
    }
    insert(schema, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield schema.create(item);
            return result.toJSON();
        });
    }
    update(schema, criteria, item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield schema.update(item, { where: criteria });
        });
    }
    upsert(schema, criteria, item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield schema.upsert(item);
        });
    }
    delete(schema, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            yield schema.destroy({ where: criteria });
        });
    }
}
exports.SequelizeConnection = SequelizeConnection;

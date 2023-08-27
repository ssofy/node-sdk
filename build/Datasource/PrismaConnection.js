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
exports.PrismaConnection = void 0;
const Connection_1 = require("./Connection");
class PrismaConnection extends Connection_1.Connection {
    constructor(client) {
        super();
        this.client = client;
    }
    query(schema, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema.findMany({
                where: criteria,
            });
        });
    }
    insert(schema, row) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema.create({
                data: row,
            });
        });
    }
    update(schema, criteria, row) {
        return __awaiter(this, void 0, void 0, function* () {
            yield schema.update({
                where: criteria,
                data: row,
            });
        });
    }
    upsert(schema, criteria, row) {
        return __awaiter(this, void 0, void 0, function* () {
            yield schema.upsert({
                where: criteria,
                create: row,
                update: row,
            });
        });
    }
    delete(schema, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            yield schema.delete({
                where: criteria,
            });
        });
    }
}
exports.PrismaConnection = PrismaConnection;

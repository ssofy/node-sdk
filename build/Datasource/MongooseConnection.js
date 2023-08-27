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
exports.MongooseConnection = void 0;
const Connection_1 = require("./Connection");
class MongooseConnection extends Connection_1.Connection {
    query(model, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model.find(criteria).exec();
        });
    }
    insert(model, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new model(item);
            return yield instance.save();
        });
    }
    update(model, criteria, item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model.updateOne(criteria, item).exec();
        });
    }
    upsert(model, criteria, item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model.updateOne(criteria, item, { upsert: true }).exec();
        });
    }
    delete(model, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            yield model.deleteOne(criteria).exec();
        });
    }
}
exports.MongooseConnection = MongooseConnection;

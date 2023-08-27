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
exports.MongoDBConnection = void 0;
const Connection_1 = require("./Connection");
class MongoDBConnection extends Connection_1.Connection {
    constructor(db) {
        super();
        this.db = db;
    }
    getCollection(schema) {
        return this.db.collection(schema);
    }
    query(schema, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection(schema);
            return yield collection.find(criteria).toArray();
        });
    }
    insert(schema, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection(schema);
            const response = yield collection.insertOne(item);
            return Object.assign(Object.assign({}, item), { _id: response.insertedId });
        });
    }
    update(schema, criteria, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection(schema);
            yield collection.updateMany(criteria, { $set: item });
        });
    }
    upsert(schema, criteria, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection(schema);
            yield collection.updateOne(criteria, { $set: item }, { upsert: true });
        });
    }
    delete(schema, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection(schema);
            yield collection.deleteMany(criteria);
        });
    }
}
exports.MongoDBConnection = MongoDBConnection;

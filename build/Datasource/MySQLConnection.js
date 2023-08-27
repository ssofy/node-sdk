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
exports.MySQLPoolConnection = void 0;
const Connection_1 = require("./Connection");
class MySQLPoolConnection extends Connection_1.Connection {
    constructor(pool) {
        super();
        this.pool = pool;
    }
    query(schema, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = Object.keys(criteria);
            const values = Object.values(criteria);
            const placeholders = keys.map(key => `${key} = ?`).join(' AND ');
            const [rows] = yield this.pool.query(`SELECT *
                                              FROM ${schema}
                                              WHERE ${placeholders}`, values);
            return rows;
        });
    }
    insert(schema, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.pool.query(`INSERT INTO ${schema}
                                                SET ?`, item);
            if ('insertId' in result) {
                return Object.assign(Object.assign({}, item), { id: result.insertId });
            }
            throw new Error('Insert operation did not return an insertId.');
        });
    }
    update(schema, criteria, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateKeys = Object.keys(item);
            const updateValues = Object.values(item);
            const updatePlaceholders = updateKeys.map(key => `${key} = ?`).join(', ');
            const criteriaKeys = Object.keys(criteria);
            const criteriaValues = Object.values(criteria);
            const criteriaPlaceholders = criteriaKeys.map(key => `${key} = ?`).join(' AND ');
            yield this.pool.query(`UPDATE ${schema}
             SET ${updatePlaceholders}
             WHERE ${criteriaPlaceholders}`, [...updateValues, ...criteriaValues]);
        });
    }
    upsert(schema, criteria, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = Object.keys(item);
            const values = Object.values(item);
            const placeholders = keys.map(() => `?`).join(', ');
            const updatePlaceholders = keys.map(key => `${key} = VALUES(${key})`).join(', ');
            yield this.pool.query(`INSERT INTO ${schema} (${keys.join(', ')})
             VALUES (${placeholders}) ON DUPLICATE KEY
            UPDATE ${updatePlaceholders}`, [...values, ...values]);
        });
    }
    delete(schema, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = Object.keys(criteria);
            const values = Object.values(criteria);
            const placeholders = keys.map(key => `${key} = ?`).join(' AND ');
            yield this.pool.query(`DELETE
                               FROM ${schema}
                               WHERE ${placeholders}`, values);
        });
    }
}
exports.MySQLPoolConnection = MySQLPoolConnection;

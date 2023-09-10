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
exports.PGPoolConnection = void 0;
const Connection_1 = require("./Connection");
class PGPoolConnection extends Connection_1.Connection {
    constructor(pool) {
        super();
        this.pool = pool;
    }
    query(schema, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = Object.keys(criteria);
            const values = Object.values(criteria);
            const placeholders = keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');
            const { rows } = yield this.pool.query(`SELECT *
                                              FROM ${schema}
                                              WHERE ${placeholders}`, values);
            return rows;
        });
    }
    insert(schema, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = Object.keys(item);
            const values = Object.values(item);
            const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');
            const { rows } = yield this.pool.query(`INSERT INTO ${schema} (${keys.join(', ')})
             VALUES (${placeholders}) RETURNING *`, values);
            return rows[0];
        });
    }
    update(schema, criteria, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateKeys = Object.keys(item);
            const updateValues = Object.values(item);
            const updatePlaceholders = updateKeys.map((key, index) => `${key} = $${index + 1}`).join(', ');
            const criteriaKeys = Object.keys(criteria);
            const criteriaValues = Object.values(criteria);
            const criteriaPlaceholders = criteriaKeys.map((key, index) => `${key} = $${index + updateValues.length + 1}`).join(' AND ');
            yield this.pool.query(`UPDATE ${schema}
             SET ${updatePlaceholders}
             WHERE ${criteriaPlaceholders}`, [...updateValues, ...criteriaValues]);
        });
    }
    upsert(schema, criteria, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = Object.keys(item);
            const values = Object.values(item);
            const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');
            const conflictKeys = Object.keys(criteria).join(', ');
            const updatePlaceholders = keys.map((key, index) => `${key} = EXCLUDED.${key}`).join(', ');
            yield this.pool.query(`INSERT INTO ${schema} (${keys.join(', ')})
             VALUES (${placeholders}) ON CONFLICT(${conflictKeys}) DO
            UPDATE
                SET ${updatePlaceholders}`, values);
        });
    }
    delete(schema, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = Object.keys(criteria);
            const values = Object.values(criteria);
            const placeholders = keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');
            yield this.pool.query(`DELETE
                               FROM ${schema}
                               WHERE ${placeholders}`, values);
        });
    }
}
exports.PGPoolConnection = PGPoolConnection;

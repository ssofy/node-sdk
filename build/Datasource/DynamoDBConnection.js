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
exports.DynamoDBConnection = void 0;
const Connection_1 = require("./Connection");
class DynamoDBConnection extends Connection_1.Connection {
    constructor(client) {
        super();
        this.client = client;
    }
    query(schema, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: schema,
                KeyConditionExpression: Object.keys(criteria).map(key => `${key} = :${key}`).join(' AND '),
                ExpressionAttributeValues: Object.entries(criteria).reduce((acc, [key, value]) => {
                    acc[`:${key}`] = value;
                    return acc;
                }, {}),
            };
            const result = yield this.client.query(params).promise();
            return result.Items;
        });
    }
    insert(schema, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: schema,
                Item: item,
            };
            yield this.client.put(params).promise();
            return item;
        });
    }
    update(schema, criteria, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateExpressions = [];
            const expressionAttributeNames = {};
            const expressionAttributeValues = {};
            Object.entries(item).forEach(([key, value], index) => {
                const attributeKey = `#attr${index}`;
                const attributeValueKey = `:value${index}`;
                updateExpressions.push(`${attributeKey} = ${attributeValueKey}`);
                expressionAttributeNames[attributeKey] = key;
                expressionAttributeValues[attributeValueKey] = value;
            });
            const params = {
                TableName: schema,
                Key: criteria,
                UpdateExpression: `SET ${updateExpressions.join(', ')}`,
                ExpressionAttributeNames: expressionAttributeNames,
                ExpressionAttributeValues: expressionAttributeValues,
            };
            yield this.client.update(params).promise();
        });
    }
    upsert(schema, _criteria, item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.insert(schema, item);
        });
    }
    delete(schema, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: schema,
                Key: criteria,
            };
            yield this.client.delete(params).promise();
        });
    }
}
exports.DynamoDBConnection = DynamoDBConnection;

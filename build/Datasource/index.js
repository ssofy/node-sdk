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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Datasource = void 0;
const ConnectionInternal = __importStar(require("./Connection"));
const MongooseConnectionInternal = __importStar(require("./MongooseConnection"));
const MongoDBConnectionInternal = __importStar(require("./MongoDBConnection"));
const MySQLConnectionInternal = __importStar(require("./MySQLConnection"));
const PGConnectionInternal = __importStar(require("./PGConnection"));
const DynamoDBConnectionInternal = __importStar(require("./DynamoDBConnection"));
const PrismaConnectionInternal = __importStar(require("./PrismaConnection"));
const SequelizeConnectionInternal = __importStar(require("./SequelizeConnection"));
var Datasource;
(function (Datasource) {
    Datasource.Connection = ConnectionInternal.Connection;
    Datasource.MongoDBConnection = MongoDBConnectionInternal.MongoDBConnection;
    Datasource.MongooseConnection = MongooseConnectionInternal.MongooseConnection;
    Datasource.DynamoDBConnection = DynamoDBConnectionInternal.DynamoDBConnection;
    Datasource.PGConnectionConnection = PGConnectionInternal.PGConnection;
    Datasource.MySQLPoolConnection = MySQLConnectionInternal.MySQLPoolConnection;
    Datasource.PrismaConnection = PrismaConnectionInternal.PrismaConnection;
    Datasource.SequelizeConnection = SequelizeConnectionInternal.SequelizeConnection;
})(Datasource = exports.Datasource || (exports.Datasource = {}));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIClient = void 0;
const APIClient_1 = require("./APIClient/APIClient");
class APIClient extends APIClient_1.APIClient {
    constructor(config) {
        super(config);
    }
}
exports.APIClient = APIClient;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SnowflakeUtil_1 = __importDefault(require("./Util/SnowflakeUtil"));
class Base {
    constructor(data, client) {
        this.client = client;
        this._patch(data);
    }
    get createdTimestamp() {
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    toJSON() {
        return {
            id: this.id
        };
    }
    _patch(data) {
        if (data.id)
            this.id = data.id;
    }
}
module.exports = Base;

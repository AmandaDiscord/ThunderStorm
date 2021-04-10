"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SnowflakeUtil_1 = __importDefault(require("./Util/SnowflakeUtil"));
class Channel {
    constructor(data, client) {
        this.client = client;
        this.partial = false;
        this.id = data.id;
        this.name = data.name;
    }
    get createdTimestamp() {
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    fetch() {
        return Promise.resolve(this);
    }
    toString() {
        return `<#${this.id}>`;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.id
        };
    }
}
module.exports = Channel;

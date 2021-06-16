"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Base_1 = __importDefault(require("./Base"));
const Constants_1 = require("../util/Constants");
const SnowflakeUtil_1 = __importDefault(require("../util/SnowflakeUtil"));
class Channel extends Base_1.default {
    constructor(client, data) {
        super(client);
        this.partial = false;
        this.type = "unknown";
        if (data)
            this._patch(data);
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
            name: this.id,
            type: Constants_1.ChannelTypes[this.type] || 0
        };
    }
    _patch(data) {
        if (data.id)
            this.id = data.id;
        if (data.name)
            this.name = data.name;
    }
}
module.exports = Channel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SnowflakeUtil_1 = __importDefault(require("../util/SnowflakeUtil"));
const Base_1 = __importDefault(require("./Base"));
class Emoji extends Base_1.default {
    constructor(client, data) {
        super(client);
        this.animated = false;
        this.deleted = false;
        this.id = data.id || null;
        this.name = data.name;
        this.animated = data.animated || false;
    }
    get identifier() {
        if (this.id)
            return `${this.name}:${this.id}`;
        return encodeURIComponent(this.name);
    }
    get url() {
        return this.client.rest.cdn.Emoji(this.id, this.animated ? "gif" : "png");
    }
    get createdTimestamp() {
        if (!this.id)
            return null;
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        if (!this.id)
            return null;
        return new Date(this.createdTimestamp);
    }
    toJSON() {
        return {
            id: this.id,
            animated: this.animated,
            name: this.name
        };
    }
    toString() {
        return this.id ? `<${this.animated ? "a" : ""}:${this.name}:${this.id}>` : this.name;
    }
    _patch(data) {
        if (data.id !== undefined)
            this.id = data.id;
        if (data.name)
            this.name = data.name;
        if (data.animated !== undefined)
            this.animated = !!data.animated;
    }
}
module.exports = Emoji;

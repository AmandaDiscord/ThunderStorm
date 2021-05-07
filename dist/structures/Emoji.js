"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("../Constants"));
const SnowflakeUtil_1 = __importDefault(require("./Util/SnowflakeUtil"));
const Collection_1 = __importDefault(require("./Util/Collection"));
class Emoji {
    constructor(data, client) {
        var _a, _b;
        this.id = null;
        this.animated = false;
        this.available = false;
        this.managed = false;
        this.requiresColons = true;
        this.user = null;
        this.roles = new Collection_1.default();
        this.client = client;
        const PartialRole = require("./Partial/PartialRole");
        const User = require("./User");
        if (data.id || data.id === null)
            this.id = data.id;
        if (data.name)
            this.name = data.name;
        if (data.animated != undefined)
            this.animated = data.animated;
        if (data.managed != undefined)
            this.managed = data.managed;
        if (data.available != undefined)
            this.available = data.available;
        if (data.require_colons != undefined)
            this.requiresColons = data.require_colons;
        if (data.user) {
            if (data.user.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id))
                this.client.user._patch(data.user);
            this.user = data.user.id === ((_b = this.client.user) === null || _b === void 0 ? void 0 : _b.id) ? this.client.user : new User(data.user, this.client);
        }
        if (data.roles && Array.isArray(data.roles)) {
            this.roles.clear();
            for (const role of data.roles)
                this.roles.set(role, new PartialRole({ id: role }, this.client));
        }
    }
    get identifier() {
        if (this.id)
            return `${this.name}:${this.id}`;
        return encodeURIComponent(this.name);
    }
    get url() {
        return `${Constants_1.default.BASE_CDN_URL}/emojis/${this.id}.${this.animated ? "gif" : "png"}`;
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
            available: this.available,
            managed: this.managed,
            name: this.name,
            requires_colons: this.requiresColons
        };
    }
    toString() {
        return this.id ? `<${this.animated ? "a" : ""}:${this.name}:${this.id}>` : this.name;
    }
    _patch(data) {
        var _a, _b;
        const PartialRole = require("./Partial/PartialRole");
        const User = require("./User");
        if (data.id || data.id === null)
            this.id = data.id;
        if (data.name)
            this.name = data.name;
        if (data.animated != undefined)
            this.animated = data.animated;
        if (data.managed != undefined)
            this.managed = data.managed;
        if (data.available != undefined)
            this.available = data.available;
        if (data.require_colons != undefined)
            this.requiresColons = data.require_colons;
        if (data.user) {
            if (data.user.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id))
                this.client.user._patch(data.user);
            this.user = data.user.id === ((_b = this.client.user) === null || _b === void 0 ? void 0 : _b.id) ? this.client.user : new User(data.user, this.client);
        }
        if (data.roles && Array.isArray(data.roles)) {
            this.roles.clear();
            for (const role of data.roles)
                this.roles.set(role, new PartialRole({ id: role }, this.client));
        }
    }
}
module.exports = Emoji;

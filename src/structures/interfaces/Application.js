"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const SnowflakeUtil_1 = __importDefault(require("../../util/SnowflakeUtil"));
const Base_1 = __importDefault(require("../Base"));
// @ts-ignore
class Application extends Base_1.default {
    constructor(client, data) {
        super(client);
        this._patch(data);
    }
    _patch(data) {
        var _a, _b, _c, _d, _e, _f;
        this.id = data.id;
        this.name = (_b = (_a = data.name) !== null && _a !== void 0 ? _a : this.name) !== null && _b !== void 0 ? _b : null;
        this.description = (_d = (_c = data.description) !== null && _c !== void 0 ? _c : this.description) !== null && _d !== void 0 ? _d : null;
        this.icon = (_f = (_e = data.icon) !== null && _e !== void 0 ? _e : this.icon) !== null && _f !== void 0 ? _f : null;
    }
    get createdTimestamp() {
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    iconURL(options = {}) {
        if (!this.icon)
            return null;
        return this.client.rest.cdn.AppIcon(this.id, this.icon, options);
    }
    coverURL(options = {}) {
        if (!this.cover)
            return null;
        return this.client.rest.cdn.AppIcon(this.id, this.cover, options);
    }
    fetchAssets() {
        return Promise.resolve([]);
    }
    toString() {
        return this.name;
    }
    toJSON() {
        return super.toJSON({ createdTimestamp: true });
    }
}
Application.default = Application;
module.exports = Application;

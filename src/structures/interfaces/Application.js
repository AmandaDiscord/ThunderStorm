"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SnowflakeUtil_1 = __importDefault(require("../../util/SnowflakeUtil"));
const Base_1 = __importDefault(require("../Base"));
class Application extends Base_1.default {
    constructor(client, data) {
        super(client);
        this._patch(data);
    }
    _patch(data) {
        var _a, _b, _c, _d, _e, _f;
        this.id = data.id;
        this.name = (_b = (_a = data.name, (_a !== null && _a !== void 0 ? _a : this.name)), (_b !== null && _b !== void 0 ? _b : null));
        this.description = (_d = (_c = data.description, (_c !== null && _c !== void 0 ? _c : this.description)), (_d !== null && _d !== void 0 ? _d : null));
        this.icon = (_f = (_e = data.icon, (_e !== null && _e !== void 0 ? _e : this.icon)), (_f !== null && _f !== void 0 ? _f : null));
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
        // @ts-ignore
        return super.toJSON({ createdTimestamp: true });
    }
}
module.exports = Application;

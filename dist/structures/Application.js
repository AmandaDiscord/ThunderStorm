"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("../Constants"));
const Base_1 = __importDefault(require("./Base"));
class Application extends Base_1.default {
    constructor(data, client) {
        super(data, client);
        this.icon = null;
        this.cover = null;
        if (data.description)
            this.description = data.description;
        if (data.icon !== undefined)
            this.icon = data.icon;
        if (data.name)
            this.name = data.name;
    }
    iconURL(options = { size: 128, format: "png", dynamic: true }) {
        if (!this.icon)
            return null;
        return `${Constants_1.default.BASE_CDN_URL}/app-icons/${this.id}/${this.icon}.${options.format || "png"}${!["webp"].includes(options.format) ? `?size=${options.size || 128}` : ""}`;
    }
    coverURL(options = { size: 128, format: "png", dynamic: true }) {
        if (!this.cover)
            return null;
        return `${Constants_1.default.BASE_CDN_URL}/app-icons/${this.id}/${this.cover}.${options.format || "png"}${!["webp"].includes(options.format) ? `?size=${options.size || 128}` : ""}`;
    }
    fetchAssets() {
        return Promise.resolve([]);
    }
    toString() {
        return this.name;
    }
    toJSON() {
        const value = {
            id: this.id,
            description: this.description,
            icon: this.icon,
            name: this.name
        };
        if (this.cover)
            value["cover_image"] = this.cover;
        return value;
    }
    _patch(data) {
        if (data.description)
            this.description = data.description;
        if (data.icon !== undefined)
            this.icon = data.icon;
        if (data.name)
            this.name = data.name;
        super._patch(data);
    }
}
module.exports = Application;

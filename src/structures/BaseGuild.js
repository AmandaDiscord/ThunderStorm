"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Base_1 = __importDefault(require("./Base"));
const SnowflakeUtil_1 = __importDefault(require("../util/SnowflakeUtil"));
// @ts-ignore
class BaseGuild extends Base_1.default {
    constructor(client, data) {
        super(client);
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.features = data.features;
    }
    get createdTimestamp() {
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    get nameAcronym() {
        return this.name
            .replace(/'s /g, " ")
            .replace(/\w+/g, e => e[0])
            .replace(/\s/g, "");
    }
    get partnered() {
        return this.features.includes("PARTNERED");
    }
    get verified() {
        return this.features.includes("VERIFIED");
    }
    iconURL(options = {}) {
        if (!this.icon)
            return null;
        return this.client.rest.cdn.Icon(this.id, this.icon, options.format, options.size, options.dynamic);
    }
    async fetch() {
        const Guild = require("./Guild");
        const data = await this.client._snow.guild.getGuild(this.id, { with_counts: true });
        return new Guild(this.client, data);
    }
    toString() {
        return this.name;
    }
}
BaseGuild.default = BaseGuild;
module.exports = BaseGuild;

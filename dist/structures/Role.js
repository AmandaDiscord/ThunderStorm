"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SnowflakeUtil_1 = __importDefault(require("./Util/SnowflakeUtil"));
class Role {
    constructor(data, client) {
        this.partial = false;
        const PartialGuild = require("./Partial/PartialGuild");
        this.client = client;
        this.name = data.name;
        this.id = data.id;
        this.color = data.color;
        this.managed = data.managed;
        this.hoisted = data.hoist;
        this.permissions = data.permissions;
        this.position = data.position;
        this.mentionable = data.mentionable;
        this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, this.client) : null;
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
        return `<@&${this.id}>`;
    }
    toJSON() {
        return {
            name: this.name,
            id: this.id,
            color: this.color,
            managed: this.managed,
            hoist: this.hoisted,
            permissions: this.permissions,
            position: this.position,
            mentionable: this.mentionable,
            guild_id: this.guild ? this.guild.id : undefined
        };
    }
}
module.exports = Role;

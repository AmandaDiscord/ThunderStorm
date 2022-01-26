"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Emoji_1 = __importDefault(require("./Emoji"));
// @ts-ignore
class BaseGuildEmoji extends Emoji_1.default {
    constructor(client, data, guild) {
        super(client, data);
        this.guild = guild;
        this.requiresColons = null;
        this.managed = null;
        this.available = null;
        this._roles = [];
        this._patch(data);
    }
    _patch(data) {
        if (data.name)
            this.name = data.name;
        if (typeof data.require_colons !== "undefined")
            this.requiresColons = data.require_colons;
        if (typeof data.managed !== "undefined")
            this.managed = data.managed;
        if (typeof data.available !== "undefined")
            this.available = data.available;
        if (data.roles)
            this._roles = data.roles;
    }
}
BaseGuildEmoji.default = BaseGuildEmoji;
module.exports = BaseGuildEmoji;

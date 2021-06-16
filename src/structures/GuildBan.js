"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Base_1 = __importDefault(require("./Base"));
class GuildBan extends Base_1.default {
    constructor(client, data, guild) {
        super(client);
        this.reason = null;
        this.id = data.user.id;
        this.guild = guild;
        this._patch(data);
    }
    _patch(data) {
        const User = require("./User");
        if (data.user)
            this.user = new User(this.client, data.user);
        if (data.reason)
            this.reason = data.reason;
    }
    get partial() {
        return true;
    }
    async fetch() {
        const bans = await this.client._snow.guild.getGuildBans(this.guild.id);
        return (bans || []).find(ban => ban.user.id === this.user.id) || null;
    }
}
module.exports = GuildBan;

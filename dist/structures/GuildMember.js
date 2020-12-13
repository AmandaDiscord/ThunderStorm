"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("./Interfaces/TextBasedChannel"));
const User_1 = __importDefault(require("./User"));
class GuildMember {
    constructor(data, client) {
        var _a;
        const PartialGuild = require("./Partial/PartialGuild");
        this.client = client;
        this.partial = false;
        this.user = data.user.id === ((_a = client.user) === null || _a === void 0 ? void 0 : _a.id) ? client.user : new User_1.default(data.user, client);
        this.id = data.user.id;
        this.nickname = data.nick || null;
        this.deaf = data.deaf || false;
        this.mute = data.mute || false;
        this.joinedAt = new Date(data.joined_at);
        this.premiumSince = data.premium_since || null;
        this.roles = data.roles || [];
        this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, client) : null;
    }
    get displayName() {
        return this.nickname || this.user.username;
    }
    get displayTag() {
        return this.nickname ? `${this.user.tag} (${this.nickname})` : this.user.tag;
    }
    toString() {
        return `<@${this.id}>`;
    }
    toJSON() {
        return {
            id: this.id,
            nick: this.nickname,
            mute: this.mute,
            joined_at: this.joinedAt,
            premium_since: this.premiumSince,
            user: this.user.toJSON(),
            roles: this.roles,
            guild_id: this.guild ? this.guild.id : undefined
        };
    }
    send(content, options = {}) {
        return TextBasedChannel_1.default.send(this, content, options);
    }
}
module.exports = GuildMember;

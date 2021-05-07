"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("./Interfaces/TextBasedChannel"));
const User_1 = __importDefault(require("./User"));
class GuildMember {
    constructor(data, client) {
        this.nickname = null;
        this.deaf = false;
        this.mute = false;
        this.premiumSince = null;
        this.roles = [];
        this.guild = null;
        this.client = client;
        this.partial = false;
        this._patch(data);
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
            joined_at: this.joinedAt.toISOString(),
            premium_since: this.premiumSince,
            user: this.user.toJSON(),
            roles: this.roles,
            guild_id: this.guild ? this.guild.id : undefined
        };
    }
    send(content, options = {}) {
        return TextBasedChannel_1.default.send(this, content, options);
    }
    _patch(data) {
        var _a, _b;
        const PartialGuild = require("./Partial/PartialGuild");
        if (data.user) {
            if (data.user.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id))
                this.client.user._patch(data.user);
            this.user = data.user.id === ((_b = this.client.user) === null || _b === void 0 ? void 0 : _b.id) ? this.client.user : new User_1.default(data.user, this.client);
            this.id = data.user.id;
        }
        if (data.nick !== undefined)
            this.nickname = data.nick;
        if (data.deaf !== undefined)
            this.deaf = data.deaf;
        if (data.mute !== undefined)
            this.mute = data.mute;
        if (data.joined_at) {
            this.joinedAt = new Date(data.joined_at);
            this.joinedTimestamp = this.joinedAt.getTime();
        }
        if (data.premium_since !== undefined)
            this.premiumSince = data.premium_since;
        if (data.roles && Array.isArray(data.roles))
            this.roles = data.roles;
        if (!this.guild || data.guild_id)
            this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, this.client) : null;
    }
}
module.exports = GuildMember;

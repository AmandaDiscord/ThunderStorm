"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const TextBasedChannel_1 = __importDefault(require("./interfaces/TextBasedChannel"));
const collection_1 = require("@discordjs/collection");
const User_1 = __importDefault(require("./User"));
// @ts-ignore
class GuildMember {
    constructor(client, data) {
        this.nickname = null;
        this.deaf = false;
        this.mute = false;
        this.joinedAt = new Date();
        this.premiumSince = null;
        this.premiumSinceTimestamp = null;
        this.roles = new collection_1.Collection();
        this.avatar = null;
        this.hoistRole = null;
        this.presence = null;
        this.lastMessageChannelId = null;
        this.client = client;
        if (data)
            this._patch(data);
    }
    get displayName() {
        return this.nickname || this.user.username;
    }
    /**
     * A combination of the member's tag and nickname
     * - Nickname set:   PapiOphidian#0110 (Async)
     * - Nickname unset: PapiOphidian#0110
     */
    get displayTag() {
        return this.nickname ? `${this.user.tag} (${this.nickname})` : this.user.tag;
    }
    createDM() {
        return this.user.createDM();
    }
    deleteDM() {
        return this.user.deleteDM();
    }
    async kick(reason) {
        if (!this.guild)
            return this;
        await this.client._snow.guild.removeGuildMember(this.guild.id, this.id, { reason });
        return this;
    }
    async ban(options) {
        if (!this.guild)
            return this;
        await this.client._snow.guild.createGuildBan(this.guild.id, this.id, { delete_message_days: (options === null || options === void 0 ? void 0 : options.days) || 0, reason: options === null || options === void 0 ? void 0 : options.reason });
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
            roles: this.roles.map(r => r.id),
            guild_id: this.guild ? this.guild.id : null,
            hoisted_role: this.hoistRole ? this.hoistRole.id : null
        };
    }
    _patch(data) {
        var _a, _b, _c;
        const PartialGuild = require("./Partial/PartialGuild");
        const PartialRole = require("./Partial/PartialRole");
        if (data.user) {
            if (data.user.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id))
                this.client.user._patch(data.user);
            this.user = data.user.id === ((_b = this.client.user) === null || _b === void 0 ? void 0 : _b.id) ? this.client.user : new User_1.default(this.client, data.user);
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
        if (data.premium_since !== undefined) {
            this.premiumSince = new Date(data.premium_since);
            this.premiumSinceTimestamp = this.premiumSince.getTime();
        }
        if (!this.guild || data.guild_id) {
            if (data.guild_id && !this.roles.has(data.guild_id))
                this.roles.set(data.guild_id, new PartialRole(this.client, { id: data.guild_id, name: "@everyone" }));
            this.guild = new PartialGuild(this.client, { id: data.guild_id });
        }
        if (data.roles && Array.isArray(data.roles)) {
            this.roles.clear();
            for (const role of data.roles) {
                if (role === data.guild_id || role === ((_c = this.guild) === null || _c === void 0 ? void 0 : _c.id))
                    continue;
                const r = new PartialRole(this.client, { id: role });
                r.guild = this.guild;
                this.roles.set(role, r);
            }
        }
        if (data.avatar !== undefined)
            this.avatar = data.avatar;
        if (data.hoisted_role || !this.hoistRole)
            this.hoistRole = data.hoisted_role ? this.roles.get(data.hoisted_role) || null : null;
    }
}
GuildMember.default = GuildMember;
TextBasedChannel_1.default.applyToClass(GuildMember);
module.exports = GuildMember;

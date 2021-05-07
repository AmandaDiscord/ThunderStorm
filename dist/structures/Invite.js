"use strict";
class Invite {
    constructor(data, client) {
        var _a, _b;
        this.guild = null;
        this.presenceCount = 0;
        this.memberCount = 0;
        this.temporary = true;
        this.maxAge = 0;
        this.uses = 0;
        this.maxUses = 0;
        this.inviter = null;
        this.targetUserType = null;
        this.targetUser = null;
        this.client = client;
        if (data.approximate_member_count && data.guild)
            Object.assign(data.guild, { member_count: data.approximate_member_count });
        const PartialGuild = require("./Partial/PartialGuild");
        const User = require("./User");
        const PartialChannel = require("./Partial/PartialChannel");
        if (data.guild || data.guild_id)
            this.guild = new PartialGuild({ id: data.guild ? data.guild.id : data.guild_id, name: data.guild ? data.guild.name : undefined }, this.client);
        if (data.code)
            this.code = data.code;
        if (data.approximate_presence_count !== undefined)
            this.presenceCount = data.approximate_presence_count;
        if (data.approximate_member_count !== undefined)
            this.memberCount = data.approximate_member_count;
        if (data.temporary !== undefined)
            this.temporary = data.temporary;
        if (data.max_age !== undefined)
            this.maxAge = data.max_age;
        if (data.uses !== undefined)
            this.uses = data.uses;
        if (data.max_uses !== undefined)
            this.maxUses = data.max_uses;
        if (data.channel || data.channel_id)
            this.channel = new PartialChannel({ id: data.channel ? data.channel.id : data.channel_id, name: data.channel ? data.channel.name : undefined, guild_id: data.guild ? data.guild.id : data.guild_id, type: data.channel ? (data.channel.type === 2 ? "voice" : data.channel.type === 1 ? "dm" : "text") : undefined }, this.client);
        if (data.created_at)
            this.createdTimestamp = new Date(data.created_at).getTime();
        if (data.inviter) {
            if (data.inviter.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id))
                this.client.user._patch(data.inviter);
            this.inviter = data.inviter.id === ((_b = this.client.user) === null || _b === void 0 ? void 0 : _b.id) ? this.client.user : new User(data.inviter, this.client);
        }
        if (data.target_type !== undefined)
            this.targetUserType = data.target_type;
        if (data.target_user !== undefined)
            this.targetUser = new User(data.target_user, this.client);
    }
    get createdAt() {
        return this.createdTimestamp ? new Date(this.createdTimestamp) : null;
    }
    get expiresTimestamp() {
        return this.createdTimestamp && this.maxAge ? this.createdTimestamp + (this.maxAge * 1000) : null;
    }
    get expiresAt() {
        return this.expiresTimestamp ? new Date(this.expiresTimestamp) : null;
    }
    get url() {
        return `https://discord.gg/${this.code}`;
    }
    async delete() {
        await this.client._snow.invite.deleteInvite(this.code);
        return this;
    }
    toString() {
        return this.url;
    }
    toJSON() {
        const value = {
            code: this.code,
            approximate_presence_count: this.presenceCount,
            approximate_member_count: this.memberCount,
            temporary: this.temporary,
            max_age: this.maxAge,
            max_uses: this.maxUses,
            channel: this.channel.toJSON(),
            channel_id: this.channel.id
        };
        if (this.inviter)
            value["inviter"] = this.inviter.toJSON();
        if (this.createdAt)
            value["created_at"] = this.createdAt.toISOString();
        if (this.guild) {
            value["guild"] = this.guild.toJSON();
            value["guild_id"] = this.guild.id;
        }
        if (this.expiresAt)
            value["expires_at"] = this.expiresAt.toISOString();
        return value;
    }
    valueOf() {
        return this.code;
    }
    _patch(data) {
        var _a, _b;
        const PartialGuild = require("./Partial/PartialGuild");
        const User = require("./User");
        const PartialChannel = require("./Partial/PartialChannel");
        if (data.guild || data.guild_id)
            this.guild = new PartialGuild({ id: data.guild ? data.guild.id : data.guild_id, name: data.guild ? data.guild.name : undefined }, this.client);
        if (data.code)
            this.code = data.code;
        if (data.approximate_presence_count !== undefined)
            this.presenceCount = data.approximate_presence_count;
        if (data.approximate_member_count !== undefined)
            this.memberCount = data.approximate_member_count;
        if (data.temporary !== undefined)
            this.temporary = data.temporary;
        if (data.max_age !== undefined)
            this.maxAge = data.max_age;
        if (data.uses !== undefined)
            this.uses = data.uses;
        if (data.max_uses !== undefined)
            this.maxUses = data.max_uses;
        if (data.channel || data.channel_id)
            this.channel = new PartialChannel({ id: data.channel ? data.channel.id : data.channel_id, name: data.channel ? data.channel.name : undefined, guild_id: data.guild ? data.guild.id : data.guild_id, type: data.channel ? (data.channel.type === 2 ? "voice" : data.channel.type === 1 ? "dm" : "text") : undefined }, this.client);
        if (data.created_at)
            this.createdTimestamp = new Date(data.created_at).getTime();
        if (data.inviter) {
            if (data.inviter.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id))
                this.client.user._patch(data.inviter);
            this.inviter = data.inviter.id === ((_b = this.client.user) === null || _b === void 0 ? void 0 : _b.id) ? this.client.user : new User(data.inviter, this.client);
        }
        if (data.target_type !== undefined)
            this.targetUserType = data.target_type;
        if (data.target_user !== undefined)
            this.targetUser = new User(data.target_user, this.client);
    }
}
module.exports = Invite;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("../Constants"));
class Invite {
    constructor(data, client) {
        var _a;
        const Guild = require("./Guild");
        const User = require("./User");
        const PartialChannel = require("./Partial/PartialChannel");
        const PartialUser = require("./Partial/PartialUser");
        this.client = client;
        if (data.approximate_member_count && data.guild)
            Object.assign(data.guild, { member_count: data.approximate_member_count });
        this.guild = new Guild(data.guild, client);
        this.code = data.code;
        this.presenceCount = data.approximate_presence_count || 0;
        this.memberCount = data.approximate_member_count || 0;
        this.textChannelCount = data.text_channel_count || 0;
        this.voiceChannelCount = data.voice_channel_count || 0;
        this.temporary = data.temporary || false;
        this.maxAge = data.max_age || 0;
        this.uses = data.uses || 0;
        this.maxUses = data.max_uses || 0;
        this.inviter = data.inviter ? (data.invite.id === ((_a = client.user) === null || _a === void 0 ? void 0 : _a.id) ? client.user : new User(data.inviter, client)) : new PartialUser({ id: Constants_1.default.SYSTEM_USER_ID }, client);
        this.channel = new PartialChannel({ id: data.channel.id, guild_id: data.guild.id }, client);
        this.createdTimestamp = data.created_at ? new Date(data.created_at).getTime() : new Date().getTime();
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    get expiresTimestamp() {
        return this.createdTimestamp + (this.maxAge * 1000);
    }
    get expiresAt() {
        return new Date(this.expiresTimestamp);
    }
    get url() {
        return `https://discord.gg/${this.code}`;
    }
    delete() {
        return this.client._snow.invite.deleteInvite(this.code).then(() => this);
    }
    toString() {
        return this.url;
    }
    toJSON() {
        return {
            guild: this.guild.toJSON(),
            code: this.code,
            approximate_presence_count: this.presenceCount,
            approximate_member_count: this.memberCount,
            text_channel_count: this.textChannelCount,
            voice_channel_count: this.voiceChannelCount,
            temporary: this.temporary,
            max_age: this.maxAge,
            max_uses: this.maxUses,
            inviter: this.inviter.toJSON(),
            channel: this.channel.toJSON(),
            created_at: this.createdAt.toUTCString()
        };
    }
}
module.exports = Invite;

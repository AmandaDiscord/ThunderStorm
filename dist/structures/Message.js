"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("../Constants"));
const Collection_1 = __importDefault(require("./Util/Collection"));
const Util_1 = __importDefault(require("./Util/Util"));
const Base_1 = __importDefault(require("./Base"));
const ClientApplication_1 = __importDefault(require("./ClientApplication"));
const User_1 = __importDefault(require("./User"));
const GuildMember_1 = __importDefault(require("./GuildMember"));
const MessageAttachment_1 = __importDefault(require("./MessageAttachment"));
const MessageFlags_1 = __importDefault(require("./MessageFlags"));
const MessageMentions_1 = __importDefault(require("./MessageMentions"));
const MessageReaction_1 = __importDefault(require("./MessageReaction"));
const ThreadTextChannel_1 = __importDefault(require("./ThreadTextChannel"));
class Message extends Base_1.default {
    constructor(data, client) {
        var _a;
        super(data, client);
        this.guild = null;
        this.member = null;
        this.attachments = new Collection_1.default();
        this.application = null;
        this.activity = null;
        this.content = "";
        this.editedAt = null;
        this.editedTimestamp = null;
        this.embeds = [];
        this.reactions = new Collection_1.default();
        this.thread = null;
        this.nonce = null;
        this.pinned = false;
        this.tts = false;
        this.type = 0;
        this.webhookID = null;
        const MessageEmbed = require("./MessageEmbed");
        const PartalGuild = require("./Partial/PartialGuild");
        const PartialChannel = require("./Partial/PartialChannel");
        if (data.id)
            this.id = data.id;
        if (data.channel_id)
            this.channel = new PartialChannel({ id: data.channel_id, guild_id: data.guild_id, type: data.guild_id ? "text" : "dm" }, this.client);
        if (data.guild_id)
            this.guild = new PartalGuild({ id: data.guild_id }, this.client);
        if (data.author)
            this.author = data.author ? data.author.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id) ? this.client.user : new User_1.default(data.author, this.client) : new User_1.default({ username: "Discord", discriminator: "0000", id: Constants_1.default.SYSTEM_USER_ID, avatar: "d9fa72d57744dea056b12e2b34a87173" }, this.client);
        if (data.member && data.author)
            this.member = new GuildMember_1.default({ user: data.author, ...data.member }, this.client);
        if (data.attachments && Array.isArray(data.attachments))
            for (const attachment of data.attachments)
                this.attachments.set(attachment.id, new MessageAttachment_1.default(attachment.url, attachment.filename, attachment));
        if (!this.application || data.application)
            this.application = data.application ? new ClientApplication_1.default(data.application, this.client) : null;
        if (!this.activity || data.activity)
            this.activity = data.activity ? { partyID: data.activity.party_id, type: data.activity.type } : null;
        if (data.content !== undefined)
            this.content = data.content || "";
        if (data.edited_timestamp) {
            this.editedAt = new Date(data.edited_timestamp);
            this.editedTimestamp = this.editedAt ? this.editedAt.getTime() : null;
        }
        if (data.embeds)
            this.embeds = data.embeds && Array.isArray(data.embeds) ? data.embeds.map(embed => new MessageEmbed(embed, true)) : [];
        if (!this.flags || data.flags !== undefined)
            this.flags = new MessageFlags_1.default(data.flags || 0).freeze();
        if (!this.mentions || data.mentions || data.mention_channels || data.mention_everyone !== undefined || data.mention_roles)
            this.mentions = new MessageMentions_1.default(this, data.mentions, data.mention_roles, data.mention_everyone, data.mention_channels);
        if (data.reactions && Array.isArray(data.reactions))
            for (const reaction of data.reactions)
                this.reactions.set(reaction.emoji.id || reaction.emoji.name, new MessageReaction_1.default(this, reaction.emoji, reaction.count, reaction.me));
        if (data.nonce !== undefined)
            this.nonce = data.nonce;
        if (data.pinned !== undefined)
            this.pinned = data.pinned;
        if (data.tts !== undefined)
            this.tts = data.tts;
        if (data.type !== undefined)
            this.type = data.type;
        this.system = this.author && this.author.system ? true : false;
        if (data.webhook_id !== undefined)
            this.webhookID = data.webhook_id;
        if (data.thread !== undefined)
            this.thread = data.thread ? new ThreadTextChannel_1.default(data.thread, this.client) : null;
    }
    get cleanContent() {
        return Util_1.default.cleanContent(this.content, this);
    }
    async edit(content, options = {}) {
        const TextBasedChannel = require("./Interfaces/TextBasedChannel");
        const msg = await TextBasedChannel.send(this, content, options);
        if (this.guild)
            msg.guild_id = this.guild.id;
        return this._patch(msg);
    }
    async delete(timeout = 0) {
        const TextBasedChannel = require("./Interfaces/TextBasedChannel");
        await TextBasedChannel.deleteMessage(this.client, this.channel.id, this.id, timeout);
        return this;
    }
    async react(emoji) {
        if (emoji.match(/^\d+$/))
            throw new TypeError("The reaction provided must be in name:id format");
        const ceregex = /<?a?:?(\w+):(\d+)>?/;
        let value;
        const match = emoji.match(ceregex);
        if (match)
            value = `${match[1]}:${match[2]}`;
        else
            value = emoji;
        await this.client._snow.channel.createReaction(this.channel.id, this.id, encodeURIComponent(value));
        return this;
    }
    async clearReactions() {
        await this.client._snow.channel.deleteAllReactions(this.channel.id, this.id);
        return this;
    }
    toJSON() {
        var _a, _b, _c, _d;
        const mentions = this.mentions.toJSON();
        const value = {
            id: this.id,
            channel_id: this.channel.id,
            guild_id: ((_a = this.guild) === null || _a === void 0 ? void 0 : _a.id) || null,
            author: this.author.toJSON(),
            member: ((_b = this.member) === null || _b === void 0 ? void 0 : _b.toJSON()) || null,
            attachments: this.attachments,
            application: ((_c = this.application) === null || _c === void 0 ? void 0 : _c.toJSON()) || null,
            content: this.content,
            edited_timestamp: ((_d = this.editedAt) === null || _d === void 0 ? void 0 : _d.toISOString()) || null,
            embeds: this.embeds.map(i => i.toJSON()),
            flags: Number(this.flags.bitfield),
            timestamp: this.createdAt.toISOString(),
            mentions: mentions.mentions,
            mention_roles: mentions.mention_roles,
            mention_everyone: mentions.mention_everyone,
            mention_channels: mentions.mention_channels,
            nonce: this.nonce,
            pinned: this.pinned,
            tts: this.tts,
            type: this.type,
            system: this.system,
            webhook_id: this.webhookID,
            thread: this.thread ? this.thread.toJSON() : null
        };
        if (this.activity) {
            const activity = {};
            if (this.activity.partyID)
                activity["party_id"] = this.activity.partyID;
            if (this.activity.type)
                activity["type"] = this.activity.type;
            Object.assign(value, activity);
        }
        return value;
    }
    toString() {
        return this.content;
    }
    _patch(data) {
        var _a;
        const MessageEmbed = require("./MessageEmbed");
        const PartalGuild = require("./Partial/PartialGuild");
        const PartialChannel = require("./Partial/PartialChannel");
        if (data.id)
            this.id = data.id;
        if (data.channel_id)
            this.channel = new PartialChannel({ id: data.channel_id, guild_id: data.guild_id, type: data.guild_id ? "text" : "dm" }, this.client);
        if (data.guild_id)
            this.guild = new PartalGuild({ id: data.guild_id }, this.client);
        if (data.author)
            this.author = data.author ? data.author.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id) ? this.client.user : new User_1.default(data.author, this.client) : new User_1.default({ username: "Discord", discriminator: "0000", id: Constants_1.default.SYSTEM_USER_ID, avatar: "d9fa72d57744dea056b12e2b34a87173" }, this.client);
        if (data.member && data.author)
            this.member = new GuildMember_1.default({ user: data.author, ...data.member }, this.client);
        if (data.attachments && Array.isArray(data.attachments))
            for (const attachment of data.attachments)
                this.attachments.set(attachment.id, new MessageAttachment_1.default(attachment.url, attachment.filename, attachment));
        if (!this.application || data.application)
            this.application = data.application ? new ClientApplication_1.default(data.application, this.client) : null;
        if (!this.activity || data.activity)
            this.activity = data.activity ? { partyID: data.activity.party_id, type: data.activity.type } : null;
        if (data.content !== undefined)
            this.content = data.content || "";
        if (data.edited_timestamp) {
            this.editedAt = new Date(data.edited_timestamp);
            this.editedTimestamp = this.editedAt ? this.editedAt.getTime() : null;
        }
        if (data.embeds)
            this.embeds = data.embeds && Array.isArray(data.embeds) ? data.embeds.map(embed => new MessageEmbed(embed, true)) : [];
        if (!this.flags || data.flags !== undefined)
            this.flags = new MessageFlags_1.default(data.flags || 0).freeze();
        if (!this.mentions || data.mentions || data.mention_channels || data.mention_everyone !== undefined || data.mention_roles)
            this.mentions = new MessageMentions_1.default(this, data.mentions, data.mention_roles, data.mention_everyone, data.mention_channels);
        if (data.reactions && Array.isArray(data.reactions))
            for (const reaction of data.reactions)
                this.reactions.set(reaction.emoji.id || reaction.emoji.name, new MessageReaction_1.default(this, reaction.emoji, reaction.count, reaction.me));
        if (data.nonce !== undefined)
            this.nonce = data.nonce;
        if (data.pinned !== undefined)
            this.pinned = data.pinned;
        if (data.tts !== undefined)
            this.tts = data.tts;
        if (data.type !== undefined)
            this.type = data.type;
        this.system = this.author && this.author.system ? true : false;
        if (data.webhook_id !== undefined)
            this.webhookID = data.webhook_id;
        if (data.thread !== undefined)
            this.thread = data.thread ? new ThreadTextChannel_1.default(data.thread, this.client) : null;
    }
}
module.exports = Message;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const User_1 = __importDefault(require("./User"));
const GuildMember_1 = __importDefault(require("./GuildMember"));
const Constants_1 = __importDefault(require("../Constants"));
class Message {
    constructor(data, client) {
        var _a;
        this.client = client;
        this.id = data.id;
        const MessageEmbed = require("./MessageEmbed");
        const PartalGuild = require("./Partial/PartialGuild");
        const PartialChannel = require("./Partial/PartialChannel");
        this.channel = new PartialChannel({ id: data.channel_id, guild_id: data.guild_id }, client);
        this.guild = data.guild_id ? new PartalGuild({ id: data.guild_id }, client) : null;
        this.author = data.author ? data.author.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id) ? this.client.user : new User_1.default(data.author, client) : new User_1.default({ username: "Discord", discriminator: "0000", id: Constants_1.default.SYSTEM_USER_ID, avatar: "d9fa72d57744dea056b12e2b34a87173" }, client);
        this.member = data.member && data.author ? new GuildMember_1.default({ user: data.author, ...data.member }, client) : null;
        this.attachments = data.attachments || [];
        this.content = data.content || "";
        this.editedAt = data.edited_timestamp ? new Date(data.edited_timestamp) : null;
        this.editedTimestamp = this.editedAt ? this.editedAt.getTime() : null;
        this.embeds = data.embeds && data.embeds.length > 0 ? data.embeds.map(embed => new MessageEmbed(embed, true)) : [];
        this.flags = data.flags || 0;
        this.createdAt = data.timestamp ? new Date(data.timestamp) : new Date();
        this.createdTimestamp = this.createdAt.getTime();
        this.mentions = data.mentions ? data.mentions.map(user => new GuildMember_1.default({ user, ...user.member }, client)) : [];
        this.nonce = data.nonce || "";
        this.pinned = data.pinned || false;
        this.tts = data.tts || false;
        this.type = data.type || 0;
        this.system = this.author && this.author.system ? true : false;
        this.webhookID = data.webhook_id || null;
    }
    toJSON() {
        var _a, _b, _c;
        return {
            id: this.id,
            channel_id: this.channel.id,
            guild_id: ((_a = this.guild) === null || _a === void 0 ? void 0 : _a.id) || null,
            author: this.author.toJSON(),
            member: ((_b = this.member) === null || _b === void 0 ? void 0 : _b.toJSON()) || null,
            attachments: this.attachments,
            content: this.content,
            edited_timestamp: ((_c = this.editedAt) === null || _c === void 0 ? void 0 : _c.toUTCString()) || null,
            embeds: this.embeds.map(i => i.toJSON()),
            flags: this.flags,
            timestamp: this.createdAt.toUTCString(),
            mentions: this.mentions.map(i => {
                const result = i.toJSON();
                const user = result.user;
                delete result.user;
                return { member: result, ...user };
            }),
            nonce: this.nonce,
            pinned: this.pinned,
            tts: this.tts,
            type: this.type,
            system: this.system,
            webhook_id: this.webhookID
        };
    }
    toString() {
        return this.content;
    }
    async edit(content, options = {}) {
        const TextBasedChannel = require("./Interfaces/TextBasedChannel");
        const data = TextBasedChannel.transform(content, options, true);
        const msg = await this.client._snow.channel.editMessage(this.channel.id, this.id, data, { disableEveryone: options.disableEveryone || this.client._snow.options.disableEveryone || false });
        if (this.guild)
            msg.guild_id = this.guild.id;
        return new Message(msg, this.client);
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
    async deleteReaction(user, emoji) {
        var _a;
        if (emoji.match(/^\d+$/))
            throw new TypeError("The reaction provided must be in name:id format");
        const ceregex = /<?a?:?(\w+):(\d+)>?/;
        let value;
        const match = emoji.match(ceregex);
        if (match)
            value = `${match[1]}:${match[2]}`;
        else
            value = emoji;
        let userID;
        if (typeof user === "string")
            userID = user;
        else
            userID = user.id;
        if (userID === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id))
            await this.client._snow.channel.deleteReactionSelf(this.channel.id, this.id, encodeURIComponent(value));
        else
            await this.client._snow.channel.deleteReaction(this.channel.id, this.id, encodeURIComponent(value), userID);
        return this;
    }
    async clearReactions() {
        await this.client._snow.channel.deleteAllReactions(this.channel.id, this.id);
        return this;
    }
}
module.exports = Message;

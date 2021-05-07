"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const PartialBase_1 = __importDefault(require("./PartialBase"));
const Message_1 = __importDefault(require("../Message"));
class PartialMessage extends PartialBase_1.default {
    constructor(data, client) {
        super(data, client);
        this.partialType = "Message";
        const PartialGuild = require("./PartialGuild");
        const PartialChannel = require("./PartialChannel");
        this.channel = new PartialChannel({ id: data.channel_id, guild_id: data.guild_id }, client);
        this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, client) : null;
    }
    async edit(content, options = {}) {
        const TextBasedChannel = require("../Interfaces/TextBasedChannel");
        const msg = await TextBasedChannel.send(this, content, options);
        if (this.guild)
            msg.guild_id = this.guild.id;
        return new Message_1.default(msg, this.client);
    }
    async delete(timeout = 0) {
        const TextBasedChannel = require("../Interfaces/TextBasedChannel");
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
        const value = { channel_id: this.channel.id };
        if (this.guild)
            value["guild_id"] = this.guild.id;
        return Object.assign(super.toJSON(), value);
    }
}
module.exports = PartialMessage;

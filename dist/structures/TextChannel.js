"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("./Interfaces/TextBasedChannel"));
const GuildChannel_1 = __importDefault(require("./GuildChannel"));
class TextChannel extends GuildChannel_1.default {
    constructor(data, client) {
        super(data, client);
        this.lastMessageID = null;
        this.lastPinAt = null;
        this.lastPinTimestamp = null;
        this.nsfw = false;
        this.rateLimitPerUser = 0;
        this.topic = "";
        this.type = "text";
        if (!this.lastMessageID || data.last_message_id !== undefined)
            this.lastMessageID = data.last_message_id || null;
        if (!this.lastPinAt || data.last_pin_timestamp !== undefined) {
            this.lastPinAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null;
            this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
        }
        if (!this.nsfw || data.nsfw !== undefined)
            this.nsfw = data.nsfw || false;
        if (!this.rateLimitPerUser || data.rate_limit_per_user !== undefined)
            this.rateLimitPerUser = data.rate_limit_per_user || 0;
        if (!this.topic || data.topic !== undefined)
            this.topic = data.topic || "";
    }
    toJSON() {
        const d = Object.assign(super.toJSON(), {
            last_message_id: this.lastMessageID,
            nsfw: this.nsfw,
            rate_limit_per_user: this.rateLimitPerUser,
            topic: this.topic,
            type: 0
        });
        if (this.lastPinAt)
            d["last_pin_timestamp"] = this.lastPinAt.toISOString();
        return d;
    }
    send(content, options = {}) {
        return TextBasedChannel_1.default.send(this, content, options);
    }
    sendTyping() {
        return TextBasedChannel_1.default.sendTyping(this.client, this.id);
    }
    async deleteMessage(messageID, timeout = 0) {
        await TextBasedChannel_1.default.deleteMessage(this.client, this.id, messageID, timeout);
    }
    async fetchMessage(messageID) {
        const data = await TextBasedChannel_1.default.fetchMessage(this.client, this.id, messageID);
        if (this.guild)
            data.guild = this.guild;
        return data;
    }
    async fetchMessages(options) {
        const data = await TextBasedChannel_1.default.fetchMessages(this.client, this.id, options);
        if (this.guild)
            data.forEach(i => i.guild = this.guild);
        return data;
    }
    _patch(data) {
        if (!this.lastMessageID || data.last_message_id !== undefined)
            this.lastMessageID = data.last_message_id || null;
        if (!this.lastPinAt || data.last_pin_timestamp !== undefined) {
            this.lastPinAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null;
            this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
        }
        if (!this.nsfw || data.nsfw !== undefined)
            this.nsfw = data.nsfw || false;
        if (!this.rateLimitPerUser || data.rate_limit_per_user !== undefined)
            this.rateLimitPerUser = data.rate_limit_per_user || 0;
        if (!this.topic || data.topic !== undefined)
            this.topic = data.topic || "";
        super._patch(data);
    }
}
module.exports = TextChannel;

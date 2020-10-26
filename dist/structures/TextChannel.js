"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("./Interfaces/TextBasedChannel"));
const GuildChannel_1 = __importDefault(require("./GuildChannel"));
class TextChannel extends GuildChannel_1.default {
    constructor(data, client) {
        super(data, client);
        this.lastMessageID = data.last_message_id || null;
        this.lastPinAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null;
        this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
        this.nsfw = data.nsfw || false;
        this.rateLimitPerUser = data.rate_limit_per_user || 0;
        this.topic = data.topic || "";
        this.type = "text";
    }
    toJSON() {
        return {
            last_message_id: this.lastMessageID,
            last_pin_timestamp: this.lastPinTimestamp,
            nsfw: this.nsfw,
            rate_limit_per_user: this.rateLimitPerUser,
            topic: this.topic,
            type: 0,
            ...super.toJSON()
        };
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
    fetchMessage(messageID) {
        return TextBasedChannel_1.default.fetchMessage(this.client, this.id, messageID);
    }
}
module.exports = TextChannel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const TextBasedChannel_1 = __importDefault(require("./interfaces/TextBasedChannel"));
const GuildChannel_1 = __importDefault(require("./GuildChannel"));
const Constants_1 = __importDefault(require("../util/Constants"));
class TextChannel extends GuildChannel_1.default {
    constructor(guild, data) {
        super(guild, data);
        this.nsfw = false;
        this.rateLimitPerUser = 0;
        this.topic = "";
        this.type = Constants_1.default.ChannelTypes[0];
    }
    // @ts-ignore
    toJSON() {
        const d = Object.assign(super.toJSON(), {
            last_message_id: this.lastMessageId,
            nsfw: this.nsfw,
            rate_limit_per_user: this.rateLimitPerUser,
            topic: this.topic,
            type: 0
        });
        if (this.lastPinAt)
            d["last_pin_timestamp"] = this.lastPinAt.toISOString();
        return d;
    }
    _patch(data) {
        super._patch(data);
        if (!this.lastMessageId || data.last_message_id !== undefined)
            this.lastMessageId = data.last_message_id || null;
        if (!this.lastPinAt || data.last_pin_timestamp !== undefined) {
            this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
        }
        if (!this.nsfw || data.nsfw !== undefined)
            this.nsfw = data.nsfw || false;
        if (!this.rateLimitPerUser || data.rate_limit_per_user !== undefined)
            this.rateLimitPerUser = data.rate_limit_per_user || 0;
        if (!this.topic || data.topic !== undefined)
            this.topic = data.topic || "";
    }
}
TextChannel.default = TextChannel;
TextBasedChannel_1.default.applyToClass(TextChannel, true);
module.exports = TextChannel;

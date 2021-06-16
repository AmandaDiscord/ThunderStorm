"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TextBasedChannel_1 = __importDefault(require("./interfaces/TextBasedChannel"));
const GuildChannel_1 = __importDefault(require("./GuildChannel"));
class TextChannel extends GuildChannel_1.default {
    constructor(guild, data) {
        super(guild, data);
        this.nsfw = false;
        this.rateLimitPerUser = 0;
        this.topic = "";
        this.type = "text";
        if (data)
            setImmediate(() => this._patch(data));
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
    _patch(data) {
        if (!this.lastMessageID || data.last_message_id !== undefined)
            this.lastMessageID = data.last_message_id || null;
        if (!this.lastPinAt || data.last_pin_timestamp !== undefined) {
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
TextBasedChannel_1.default.applyToClass(TextChannel, true);
module.exports = TextChannel;

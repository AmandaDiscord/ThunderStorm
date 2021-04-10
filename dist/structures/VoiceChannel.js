"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const GuildChannel_1 = __importDefault(require("./GuildChannel"));
class VoiceChannel extends GuildChannel_1.default {
    constructor(data, client) {
        super(data, client);
        this.bitrate = data.bitrate || 8;
        this.userLimit = data.user_limit || 0;
        this.type = "voice";
        this.rtcRegion = data.rtc_region || null;
    }
    toJSON() {
        return Object.assign(super.toJSON(), {
            bitrate: this.bitrate,
            user_limit: this.userLimit,
            rtc_region: this.rtcRegion,
            type: 2
        });
    }
}
module.exports = VoiceChannel;

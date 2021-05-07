"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const GuildChannel_1 = __importDefault(require("./GuildChannel"));
class VoiceChannel extends GuildChannel_1.default {
    constructor(data, client) {
        super(data, client);
        this.bitrate = 8;
        this.userLimit = 0;
        this.rtcRegion = null;
        this.type = "voice";
        if (data.bitrate !== undefined)
            this.bitrate = data.bitrate;
        if (data.user_limit !== undefined)
            this.userLimit = data.user_limit;
        if (data.rtc_region !== undefined)
            this.rtcRegion = data.rtc_region;
    }
    toJSON() {
        return Object.assign(super.toJSON(), {
            bitrate: this.bitrate,
            user_limit: this.userLimit,
            rtc_region: this.rtcRegion,
            type: 2
        });
    }
    _patch(data) {
        if (data.bitrate !== undefined)
            this.bitrate = data.bitrate;
        if (data.user_limit !== undefined)
            this.userLimit = data.user_limit;
        if (data.rtc_region !== undefined)
            this.rtcRegion = data.rtc_region;
        super._patch(data);
    }
}
module.exports = VoiceChannel;

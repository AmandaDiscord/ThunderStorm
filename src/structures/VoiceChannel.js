"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseGuildVoiceChannel_1 = __importDefault(require("./BaseGuildVoiceChannel"));
class VoiceChannel extends BaseGuildVoiceChannel_1.default {
    constructor(guild, data) {
        super(guild, data);
        this.bitrate = 8;
        this.userLimit = 0;
        this.rtcRegion = null;
        this.type = "voice";
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

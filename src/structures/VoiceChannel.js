"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const BaseGuildVoiceChannel_1 = __importDefault(require("./BaseGuildVoiceChannel"));
const Constants_1 = __importDefault(require("../util/Constants"));
class VoiceChannel extends BaseGuildVoiceChannel_1.default {
    constructor(guild, data) {
        super(guild, data);
        this.bitrate = 8;
        this.userLimit = 0;
        this.rtcRegion = null;
        this.type = Constants_1.default.ChannelTypes[2];
    }
    // @ts-ignore
    toJSON() {
        return Object.assign(super.toJSON(), {
            bitrate: this.bitrate,
            user_limit: this.userLimit,
            rtc_region: this.rtcRegion,
            type: 2
        });
    }
    _patch(data) {
        super._patch(data);
        if (data.bitrate !== undefined)
            this.bitrate = data.bitrate;
        if (data.user_limit !== undefined)
            this.userLimit = data.user_limit;
        if (data.rtc_region !== undefined)
            this.rtcRegion = data.rtc_region;
        super._patch(data);
    }
}
VoiceChannel.default = VoiceChannel;
module.exports = VoiceChannel;

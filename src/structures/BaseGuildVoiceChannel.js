"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const GuildChannel_1 = __importDefault(require("./GuildChannel"));
// @ts-ignore
class BaseGuildVoiceChannel extends GuildChannel_1.default {
    _patch(data) {
        super._patch(data);
        this.rtcRegion = data.rtc_region;
        this.bitrate = data.bitrate;
        this.userLimit = data.user_limit;
    }
}
BaseGuildVoiceChannel.default = BaseGuildVoiceChannel;
module.exports = BaseGuildVoiceChannel;

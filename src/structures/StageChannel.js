"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const VoiceChannel_1 = __importDefault(require("./VoiceChannel"));
const Constants_1 = __importDefault(require("../util/Constants"));
class StageChannel extends VoiceChannel_1.default {
    constructor(guild, data) {
        super(guild, data);
        // @ts-ignore
        this.type = Constants_1.default.ChannelTypes[13];
    }
    // @ts-ignore
    toJSON() {
        return Object.assign(super.toJSON(), { type: 13 });
    }
}
StageChannel.default = StageChannel;
module.exports = StageChannel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const GuildChannel_1 = __importDefault(require("./GuildChannel"));
const Constants_1 = __importDefault(require("../util/Constants"));
class StoreChannel extends GuildChannel_1.default {
    constructor(guild, data) {
        super(guild, data);
        this.type = Constants_1.default.ChannelTypes[6];
        this.nsfw = Boolean(data.nsfw);
    }
    _patch(data) {
        super._patch(data);
        if ("nsfw" in data) {
            this.nsfw = Boolean(data.nsfw);
        }
    }
}
StoreChannel.default = StoreChannel;
module.exports = StoreChannel;

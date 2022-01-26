"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const GuildChannel_1 = __importDefault(require("./GuildChannel"));
const Constants_1 = __importDefault(require("../util/Constants"));
// @ts-ignore
class CategoryChannel extends GuildChannel_1.default {
    constructor(guild, data) {
        super(guild, data);
        this.type = Constants_1.default.ChannelTypes[4];
    }
    // @ts-ignore
    toJSON() {
        return Object.assign(super.toJSON(), { type: 4, nsfw: this.nsfw });
    }
    _patch(data) {
        if (data.nsfw)
            this.nsfw = data.nsfw || false;
        super._patch(data);
    }
}
CategoryChannel.default = CategoryChannel;
module.exports = CategoryChannel;

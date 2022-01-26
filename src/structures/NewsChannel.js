"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const TextChannel_1 = __importDefault(require("./TextChannel"));
const Constants_1 = __importDefault(require("../util/Constants"));
class NewsChannel extends TextChannel_1.default {
    constructor(guild, data) {
        super(guild, data);
        // @ts-ignore
        this.type = Constants_1.default.ChannelTypes[5];
    }
    // @ts-ignore
    toJSON() {
        return Object.assign(super.toJSON(), { type: 5 });
    }
}
NewsChannel.default = NewsChannel;
module.exports = NewsChannel;

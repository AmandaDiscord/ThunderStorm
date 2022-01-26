"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Base_1 = __importDefault(require("./Base"));
const Emoji_1 = __importDefault(require("./Emoji"));
// @ts-ignore
class WelcomeChannel extends Base_1.default {
    constructor(guild, data) {
        super(guild.client);
        this.guild = guild;
        this.description = data.description;
        this._emoji = {
            name: data.emoji_name || "",
            id: data.emoji_id
        };
        this.channelId = data.channel_id;
    }
    get channel() {
        const PartialChannel = require("./Partial/PartialChannel");
        const PartialGuild = require("./Partial/PartialGuild");
        const pc = new PartialChannel(this.client, { id: this.channelId, guild_id: this.guild.id });
        if (this.guild instanceof PartialGuild)
            pc.guild = this.guild;
        else
            pc.guild = new PartialGuild(this.client, { id: this.guild.id });
        return pc;
    }
    get emoji() {
        return new Emoji_1.default(this.client, this._emoji);
    }
}
WelcomeChannel.default = WelcomeChannel;
module.exports = WelcomeChannel;

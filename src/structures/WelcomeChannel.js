"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Base_1 = __importDefault(require("./Base"));
const Emoji_1 = __importDefault(require("./Emoji"));
class WelcomeChannel extends Base_1.default {
    constructor(guild, data) {
        super(guild.client);
        this.guild = guild;
        this.description = data.description;
        this._emoji = {
            // @ts-ignore
            name: data.emoji_name,
            // @ts-ignore
            id: data.emoji_id
        };
        // @ts-ignore
        this.channelID = data.channel_id;
    }
    get channel() {
        const PartialChannel = require("./Partial/PartialChannel");
        const PartialGuild = require("./Partial/PartialGuild");
        const pc = new PartialChannel(this.client, { id: this.channelID, guild_id: this.guild.id });
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
module.exports = WelcomeChannel;

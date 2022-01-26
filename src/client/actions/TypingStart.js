"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class TypingStart extends Action_1.default {
    handle(data) {
        const PartialChannel = require("../../structures/Partial/PartialChannel");
        const PartialUser = require("../../structures/Partial/PartialUser");
        this.client.emit(Constants_1.Events.TYPING_START, new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id, type: data.guild_id ? Constants_1.ChannelTypes[0] : Constants_1.ChannelTypes[1] }), new PartialUser(this.client, { id: data.user_id }));
    }
    tooLate(channel, user) {
        void 0;
    }
}
TypingStart.default = TypingStart;
module.exports = TypingStart;

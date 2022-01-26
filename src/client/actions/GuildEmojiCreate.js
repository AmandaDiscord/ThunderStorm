"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class GuildEmojiCreateAction extends Action_1.default {
    handle(guild, createdEmoji) {
        this.client.emit(Constants_1.Events.GUILD_EMOJI_CREATE, createdEmoji);
        return { emoji: createdEmoji };
    }
}
GuildEmojiCreateAction.default = GuildEmojiCreateAction;
module.exports = GuildEmojiCreateAction;

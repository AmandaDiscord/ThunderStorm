"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class MessageReactionRemoveEmoji extends Action_1.default {
    handle(data) {
        const PartialMessage = require("../../structures/Partial/PartialMessage");
        const MessageReaction = require("../../structures/MessageReaction");
        const reaction = new MessageReaction(new PartialMessage(this.client, { id: data.message_id, channel_id: data.channel_id, guild_id: data.guild_id }), data.emoji, 0, false);
        this.client.emit(Constants_1.Events.MESSAGE_REACTION_REMOVE_EMOJI, reaction);
        return { reaction };
    }
}
MessageReactionRemoveEmoji.default = MessageReactionRemoveEmoji;
module.exports = MessageReactionRemoveEmoji;

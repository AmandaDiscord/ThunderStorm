"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class MessageReactionRemove extends Action_1.default {
    handle(data) {
        var _a;
        const PartialMessage = require("../../structures/Partial/PartialMessage");
        const PartialUser = require("../../structures/Partial/PartialUser");
        const MessageReaction = require("../../structures/MessageReaction");
        if (!data.emoji)
            return false;
        const reaction = new MessageReaction(new PartialMessage(this.client, { id: data.message_id, channel_id: data.channel_id, guild_id: data.guild_id }), data.emoji, 1, data.user_id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id));
        const user = new PartialUser(this.client, { id: data.user_id });
        this.client.emit(Constants_1.Events.MESSAGE_REACTION_REMOVE, reaction, user);
        return { message: reaction.message, reaction, user };
    }
}
MessageReactionRemove.default = MessageReactionRemove;
module.exports = MessageReactionRemove;

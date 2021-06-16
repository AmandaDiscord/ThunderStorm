"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class MessageReactionRemoveAll extends Action_1.default {
    handle(data) {
        const PartialMessage = require("../../structures/Partial/PartialMessage");
        const message = new PartialMessage(this.client, { id: data.message_id, channel_id: data.channel_id, guild_id: data.guild_id });
        this.client.emit(Constants_1.Events.MESSAGE_REACTION_REMOVE_ALL, message);
        return { message };
    }
}
module.exports = MessageReactionRemoveAll;

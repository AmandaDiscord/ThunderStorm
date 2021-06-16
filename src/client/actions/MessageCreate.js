"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class MessageCreateAction extends Action_1.default {
    handle(data) {
        const Message = require("../../structures/Message");
        const PartialChannel = require("../../structures/Partial/PartialChannel");
        const PartialMessage = require("../../structures/Partial/PartialMessage");
        const channel = new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id, type: data.guild_id ? "text" : "dm" });
        const message = new Message(this.client, data, channel);
        const msg = new PartialMessage(this.client, { id: data.id, channel_id: data.channel_id });
        msg.channel = channel;
        msg.guild = message.guild;
        message.channel.lastMessageID = data.id;
        if (message.author) {
            message.author.lastMessageID = data.id;
            message.author.lastMessageChannelID = data.channel_id;
            message.author.lastMessage = msg;
        }
        if (message.member) {
            message.member.lastMessageID = data.id;
            message.member.lastMessageChannelID = data.channel_id;
            message.member.lastMessage = msg;
        }
        this.client.emit(Constants_1.Events.MESSAGE_CREATE, message);
        return { message };
    }
}
module.exports = MessageCreateAction;

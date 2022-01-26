"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class MessageCreateAction extends Action_1.default {
    handle(data) {
        const Message = require("../../structures/Message");
        const PartialChannel = require("../../structures/Partial/PartialChannel");
        const PartialMessage = require("../../structures/Partial/PartialMessage");
        const channel = new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id, type: data.guild_id ? Constants_1.ChannelTypes[0] : Constants_1.ChannelTypes[1] });
        const message = new Message(this.client, data, channel);
        const msg = new PartialMessage(this.client, { id: data.id, channel_id: data.channel_id });
        msg.channel = channel;
        msg.guild = message.guild;
        message.channel.lastMessageId = data.id;
        if (message.author) {
            message.author.lastMessageId = data.id;
            message.author.lastMessageChannelId = data.channel_id;
            message.author.lastMessage = msg;
        }
        if (message.member) {
            message.member.lastMessageId = data.id;
            message.member.lastMessageChannelId = data.channel_id;
            message.member.lastMessage = msg;
        }
        this.client.emit(Constants_1.Events.MESSAGE_CREATE, message);
        return { message };
    }
}
MessageCreateAction.default = MessageCreateAction;
module.exports = MessageCreateAction;

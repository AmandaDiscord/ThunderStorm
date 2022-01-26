"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const collection_1 = require("@discordjs/collection");
const Constants_1 = require("../../util/Constants");
class MessageDeleteBulkAction extends Action_1.default {
    handle(data) {
        const PartialChannel = require("../../structures/Partial/PartialChannel");
        const PartialMessage = require("../../structures/Partial/PartialMessage");
        const msgs = [];
        const channel = new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id, type: data.guild_id ? Constants_1.ChannelTypes[0] : Constants_1.ChannelTypes[1] });
        for (const id of data.ids) {
            const message = new PartialMessage(this.client, { id: id, channel_id: data.channel_id });
            message.channel = channel;
            if (channel.guild)
                message.guild = channel.guild;
            msgs.push(message);
        }
        const messages = new collection_1.Collection(msgs.map(msg => [msg.id, msg]));
        this.client.emit(Constants_1.Events.MESSAGE_BULK_DELETE, messages);
        return { messages };
    }
}
MessageDeleteBulkAction.default = MessageDeleteBulkAction;
module.exports = MessageDeleteBulkAction;

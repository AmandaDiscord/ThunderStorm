"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class MessageUpdateAction extends Action_1.default {
    handle(data) {
        const Message = require("../../structures/Message");
        const PartialChannel = require("../../structures/Partial/PartialChannel");
        const channel = new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id, type: data.guild_id ? Constants_1.ChannelTypes[0] : Constants_1.ChannelTypes[1] });
        const message = new Message(this.client, data, channel);
        this.client.emit(Constants_1.Events.MESSAGE_UPDATE, message);
        return {
            old: null,
            updated: message
        };
    }
}
MessageUpdateAction.default = MessageUpdateAction;
module.exports = MessageUpdateAction;

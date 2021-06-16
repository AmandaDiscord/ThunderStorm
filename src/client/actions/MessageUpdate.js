"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class MessageUpdateAction extends Action_1.default {
    handle(data) {
        const Message = require("../../structures/Message");
        const PartialChannel = require("../../structures/Partial/PartialChannel");
        const channel = new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id, type: data.guild_id ? "text" : "dm" });
        const message = new Message(this.client, data, channel);
        this.client.emit(Constants_1.Events.MESSAGE_UPDATE, message);
        return {
            old: null,
            updated: message
        };
    }
}
module.exports = MessageUpdateAction;

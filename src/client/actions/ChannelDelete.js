"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class ChannelDeleteAction extends Action_1.default {
    constructor(client) {
        super(client);
        this.deleted = new Map();
    }
    handle(data) {
        const PartialChannel = require("../../structures/Partial/PartialChannel");
        const channel = new PartialChannel(this.client, { id: data.id, name: data.name, type: Constants_1.ChannelTypes[data.type] || "text" });
        this.client.emit(Constants_1.Events.CHANNEL_DELETE, channel);
        return { channel };
    }
}
ChannelDeleteAction.default = ChannelDeleteAction;
module.exports = ChannelDeleteAction;

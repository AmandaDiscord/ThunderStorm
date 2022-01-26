"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class WebhooksUpdate extends Action_1.default {
    handle(data) {
        const PartialChannel = require("../../structures/Partial/PartialChannel");
        this.client.emit(Constants_1.Events.WEBHOOKS_UPDATE, new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id, type: Constants_1.ChannelTypes[0] }));
    }
}
WebhooksUpdate.default = WebhooksUpdate;
module.exports = WebhooksUpdate;

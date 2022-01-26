"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
const Util_1 = __importDefault(require("../../util/Util"));
class ChannelUpdateAction extends Action_1.default {
    handle(data) {
        const channel = Util_1.default.createChannelFromData(this.client, data);
        this.client.emit(Constants_1.Events.CHANNEL_UPDATE, channel);
        return { channel };
    }
}
ChannelUpdateAction.default = ChannelUpdateAction;
module.exports = ChannelUpdateAction;

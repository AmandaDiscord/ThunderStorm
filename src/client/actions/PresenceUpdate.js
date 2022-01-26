"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class PresenceUpdateAction extends Action_1.default {
    handle(data) {
        const Presence = require("../../structures/Presence").Presence;
        const presence = new Presence(this.client, data);
        this.client.emit(Constants_1.Events.PRESENCE_UPDATE, presence);
    }
}
PresenceUpdateAction.default = PresenceUpdateAction;
module.exports = PresenceUpdateAction;

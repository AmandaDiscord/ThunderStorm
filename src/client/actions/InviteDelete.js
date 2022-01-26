"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class InviteDeleteAction extends Action_1.default {
    handle(data) {
        const Invite = require("../../structures/Invite");
        const invite = new Invite(this.client, data);
        this.client.emit(Constants_1.Events.INVITE_DELETE, invite);
        return { invite };
    }
}
InviteDeleteAction.default = InviteDeleteAction;
module.exports = InviteDeleteAction;

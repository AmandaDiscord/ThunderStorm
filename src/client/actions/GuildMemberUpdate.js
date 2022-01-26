"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class GuildMemberUpdateAction extends Action_1.default {
    handle(data) {
        const GuildMember = require("../../structures/GuildMember");
        const member = new GuildMember(this.client, data);
        this.client.emit(Constants_1.Events.GUILD_MEMBER_UPDATE, member);
    }
}
GuildMemberUpdateAction.default = GuildMemberUpdateAction;
module.exports = GuildMemberUpdateAction;

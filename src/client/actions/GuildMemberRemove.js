"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class GuildMemberRemoveAction extends Action_1.default {
    handle(data) {
        const GuildMember = require("../../structures/GuildMember");
        const member = new GuildMember(this.client, { user: data.user, guild_id: data.guild_id, deaf: false, hoisted_role: data.guild_id, joined_at: new Date().toISOString(), mute: false, nick: null, roles: [] });
        this.client.emit(Constants_1.Events.GUILD_MEMBER_REMOVE, member);
        return { guild: member.guild, member };
    }
}
module.exports = GuildMemberRemoveAction;

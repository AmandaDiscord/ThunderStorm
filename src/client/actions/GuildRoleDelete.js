"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class GuildRoleDeleteAction extends Action_1.default {
    handle(data) {
        const PartialRole = require("../../structures/Partial/PartialRole");
        const role = new PartialRole(this.client, { id: data.role_id, guild_id: data.guild_id });
        this.client.emit(Constants_1.Events.GUILD_ROLE_DELETE, role);
        return { role };
    }
}
GuildRoleDeleteAction.default = GuildRoleDeleteAction;
module.exports = GuildRoleDeleteAction;

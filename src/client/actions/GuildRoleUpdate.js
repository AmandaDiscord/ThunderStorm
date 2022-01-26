"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class GuildRoleUpdateAction extends Action_1.default {
    handle(data) {
        const Role = require("../../structures/Role");
        const role = new Role(this.client, Object.assign({}, data.role, { guild_id: data.guild_id }));
        this.client.emit(Constants_1.Events.GUILD_ROLE_UPDATE, role);
        return {
            old: null,
            updated: role
        };
    }
}
GuildRoleUpdateAction.default = GuildRoleUpdateAction;
module.exports = GuildRoleUpdateAction;

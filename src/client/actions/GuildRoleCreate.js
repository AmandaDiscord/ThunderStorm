"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class GuildRoleCreate extends Action_1.default {
    handle(data) {
        const Role = require("../../structures/Role");
        const role = new Role(this.client, Object.assign({}, data.role, { guild_id: data.guild_id }));
        this.client.emit(Constants_1.Events.GUILD_ROLE_CREATE, role);
        return { role };
    }
}
module.exports = GuildRoleCreate;

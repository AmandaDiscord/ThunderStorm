"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class GuildBanRemove extends Action_1.default {
    handle(data) {
        const GuildBan = require("../../structures/GuildBan");
        const PartialGuild = require("../../structures/Partial/PartialGuild");
        this.client.emit(Constants_1.Events.GUILD_BAN_REMOVE, new GuildBan(this.client, data, new PartialGuild(this.client, { id: data.guild_id })));
    }
}
module.exports = GuildBanRemove;

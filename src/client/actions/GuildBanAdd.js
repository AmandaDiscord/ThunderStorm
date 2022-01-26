"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class GuildBanAdd extends Action_1.default {
    handle(data) {
        const GuildBan = require("../../structures/GuildBan");
        const PartialGuild = require("../../structures/Partial/PartialGuild");
        this.client.emit(Constants_1.Events.GUILD_BAN_ADD, new GuildBan(this.client, data, new PartialGuild(this.client, { id: data.guild_id })));
    }
}
GuildBanAdd.default = GuildBanAdd;
module.exports = GuildBanAdd;

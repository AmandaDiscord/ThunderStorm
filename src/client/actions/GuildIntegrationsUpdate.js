"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class GuildIntegrationsUpdate extends Action_1.default {
    handle(data) {
        const PartialGuild = require("../../structures/Partial/PartialGuild");
        const guild = new PartialGuild(this.client, { id: data.guild_id });
        this.client.emit(Constants_1.Events.GUILD_INTEGRATIONS_UPDATE, guild);
    }
}
module.exports = GuildIntegrationsUpdate;

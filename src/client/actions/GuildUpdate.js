"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class GuildUpdateAction extends Action_1.default {
    handle(data) {
        const Guild = require("../../structures/Guild");
        const guild = new Guild(this.client, data);
        this.client.emit(Constants_1.Events.GUILD_UPDATE, guild);
        return {
            old: null,
            updated: guild
        };
    }
}
module.exports = GuildUpdateAction;

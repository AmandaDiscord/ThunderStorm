"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class GuildDeleteAction extends Action_1.default {
    constructor(client) {
        super(client);
        this.deleted = new Map();
    }
    handle(data) {
        const PartialGuild = require("../../structures/Partial/PartialGuild");
        const guild = new PartialGuild(this.client, data);
        if (data.unavailable) {
            this.client.emit(Constants_1.Events.GUILD_UNAVAILABLE, guild);
            return { guild: null };
        }
        this.client.emit(Constants_1.Events.GUILD_DELETE, guild);
        return { guild };
    }
    scheduleForDeletion(id) {
        void 0;
    }
}
module.exports = GuildDeleteAction;

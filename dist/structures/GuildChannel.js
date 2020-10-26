"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Channel_1 = __importDefault(require("./Channel"));
class GuildChannel extends Channel_1.default {
    constructor(data, client) {
        super(data, client);
        const PartialGuild = require("./Partial/PartialGuild");
        this.parentID = data.parent_id || null;
        this.position = data.position;
        this.guild = new PartialGuild({ id: data.guild_id }, client);
    }
    toJSON() {
        return {
            guild_id: this.guild.id,
            parent_id: this.parentID,
            position: this.position,
            ...super.toJSON()
        };
    }
}
module.exports = GuildChannel;

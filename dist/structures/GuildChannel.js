"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Channel_1 = __importDefault(require("./Channel"));
const Collection_1 = __importDefault(require("./Util/Collection"));
const PermissionOverwrites_1 = __importDefault(require("./PermissionOverwrites"));
class GuildChannel extends Channel_1.default {
    constructor(data, client) {
        super(data, client);
        const PartialGuild = require("./Partial/PartialGuild");
        this.parentID = data.parent_id || null;
        this.position = data.position;
        this.permissionOverwrites = new Collection_1.default((data.permission_overwrites || []).map(i => [i.id, new PermissionOverwrites_1.default(this, i)]));
        this.guild = new PartialGuild({ id: data.guild_id }, client);
    }
    toJSON() {
        return {
            guild_id: this.guild.id,
            parent_id: this.parentID,
            position: this.position,
            permission_overwrites: [...this.permissionOverwrites.values()].map(i => i.toJSON()),
            ...super.toJSON()
        };
    }
}
module.exports = GuildChannel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Channel_1 = __importDefault(require("./Channel"));
const Collection_1 = __importDefault(require("../util/Collection"));
const PermissionOverwrites_1 = __importDefault(require("./PermissionOverwrites"));
class GuildChannel extends Channel_1.default {
    constructor(guild, data) {
        super(guild.client, data);
        this.parentID = null;
        this.rawPosition = 0;
        this.permissionOverwrites = new Collection_1.default();
        this.guild = guild;
    }
    toJSON() {
        return {
            guild_id: this.guild.id,
            parent_id: this.parentID,
            position: this.rawPosition,
            permission_overwrites: [...this.permissionOverwrites.values()].map(i => i.toJSON()),
            ...super.toJSON()
        };
    }
    _patch(data) {
        const PartialGuild = require("./Partial/PartialGuild");
        if (!this.parentID || data.parent_id !== undefined)
            this.parentID = data.parent_id || null;
        if (data.position !== undefined)
            this.rawPosition = data.position;
        if (data.permission_overwrites && Array.isArray(data.permission_overwrites))
            for (const i of data.permission_overwrites)
                this.permissionOverwrites.set(i.id, new PermissionOverwrites_1.default(this, i));
        if (data.guild_id)
            this.guild = new PartialGuild(this.client, { id: data.guild_id });
        super._patch(data);
    }
}
module.exports = GuildChannel;

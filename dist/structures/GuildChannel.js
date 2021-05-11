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
        this.parentID = null;
        this.position = 0;
        this.permissionOverwrites = new Collection_1.default();
        const PartialGuild = require("./Partial/PartialGuild");
        if (!this.parentID || data.parent_id !== undefined)
            this.parentID = data.parent_id || null;
        if (data.position !== undefined)
            this.position = data.position;
        if (data.permission_overwrites && Array.isArray(data.permission_overwrites))
            for (const i of data.permission_overwrites)
                this.permissionOverwrites.set(i.id, new PermissionOverwrites_1.default(this, i));
        if (data.guild_id)
            this.guild = new PartialGuild({ id: data.guild_id }, this.client);
    }
    toJSON() {
        // @ts-ignore
        return {
            guild_id: this.guild.id,
            parent_id: this.parentID,
            position: this.position,
            permission_overwrites: [...this.permissionOverwrites.values()].map(i => i.toJSON()),
            ...super.toJSON()
        };
    }
    _patch(data) {
        const PartialGuild = require("./Partial/PartialGuild");
        if (!this.parentID || data.parent_id !== undefined)
            this.parentID = data.parent_id || null;
        if (data.position !== undefined)
            this.position = data.position;
        if (data.permission_overwrites && Array.isArray(data.permission_overwrites))
            for (const i of data.permission_overwrites)
                this.permissionOverwrites.set(i.id, new PermissionOverwrites_1.default(this, i));
        if (data.guild_id)
            this.guild = new PartialGuild({ id: data.guild_id }, this.client);
        super._patch(data);
    }
}
module.exports = GuildChannel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Channel_1 = __importDefault(require("./Channel"));
const collection_1 = require("@discordjs/collection");
const PermissionOverwrites_1 = __importDefault(require("./PermissionOverwrites"));
// @ts-ignore
class GuildChannel extends Channel_1.default {
    constructor(guild, data) {
        super(guild.client, data);
        this.parentId = null;
        this.rawPosition = 0;
        this.guild = guild;
        this.permissionOverwrites = this.permissionOverwrites || new collection_1.Collection();
    }
    // @ts-ignore
    toJSON() {
        return {
            guild_id: this.guild.id,
            parent_id: this.parentId,
            position: this.rawPosition,
            permission_overwrites: [...this.permissionOverwrites.values()].map(i => i.toJSON()),
            ...super.toJSON()
        };
    }
    _patch(data) {
        const PartialGuild = require("./Partial/PartialGuild");
        super._patch(data);
        if (!this.parentId || data.parent_id !== undefined)
            this.parentId = data.parent_id || null;
        if (data.position !== undefined)
            this.rawPosition = data.position;
        if (data.permission_overwrites && Array.isArray(data.permission_overwrites)) {
            this.permissionOverwrites = new collection_1.Collection();
            for (const i of data.permission_overwrites)
                this.permissionOverwrites.set(i.id, new PermissionOverwrites_1.default(this, i));
        }
        if (data.guild_id)
            this.guild = new PartialGuild(this.client, { id: data.guild_id });
    }
}
GuildChannel.default = GuildChannel;
module.exports = GuildChannel;

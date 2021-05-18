"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Collection_1 = __importDefault(require("./Util/Collection"));
const TextChannel_1 = __importDefault(require("./TextChannel"));
const ThreadMetadata_1 = __importDefault(require("./ThreadMetadata"));
const ThreadMember_1 = __importDefault(require("./ThreadMember"));
class ThreadTextChannel extends TextChannel_1.default {
    constructor(data, client) {
        // @ts-ignore
        super(data, client);
        // @ts-ignore
        this.type = "text-thread";
        this.private = false;
        this.memberCount = 0;
        this.messageCount = 0;
        this.members = new Collection_1.default();
        const PartialChannel = require("./Partial/PartialChannel");
        const PartialGuild = require("./Partial/PartialGuild");
        const PartialUser = require("./Partial/PartialUser");
        if (data.owner_id) {
            this.ownerID = data.owner_id;
            this.owner = new PartialUser({ id: this.ownerID }, this.client);
        }
        if (data.member_count !== undefined)
            this.memberCount = data.member_count;
        if (data.message_count !== undefined)
            this.messageCount = data.message_count;
        if (!this.meta || data.thread_metadata)
            this.meta = new ThreadMetadata_1.default(this, data.thread_metadata);
        if (data.type)
            this.private = data.type === 12 ? true : false;
        if (data.parent_id)
            this.parent = new PartialChannel({ id: data.parent_id, guild_id: data.guild_id, type: "text" }, this.client);
        if (data.guild_id)
            this.guild = new PartialGuild({ id: data.guild_id }, this.client);
    }
    async fetchMembers() {
        const ms = await this.client._snow.channel.getChannelThreadMembers(this.id);
        if (!ms)
            return null;
        const members = ms.map(m => new ThreadMember_1.default(this, m));
        this.members.clear();
        for (const member of members)
            this.members.set(member.id, member);
        return members;
    }
    // @ts-ignore
    toJSON() {
        return Object.assign(super.toJSON(), {
            type: this.private ? 12 : 11,
            owner_id: this.ownerID,
            member_count: this.memberCount,
            message_count: this.messageCount,
            thread_metadata: this.meta.toJSON(),
            parent_id: this.parent.id,
            guild_id: this.guild.id
        });
    }
    // @ts-ignore
    _patch(data) {
        const PartialChannel = require("./Partial/PartialChannel");
        const PartialGuild = require("./Partial/PartialGuild");
        const PartialUser = require("./Partial/PartialUser");
        if (data.owner_id) {
            this.ownerID = data.owner_id;
            this.owner = new PartialUser({ id: this.ownerID }, this.client);
        }
        if (data.member_count !== undefined)
            this.memberCount = data.member_count;
        if (data.message_count !== undefined)
            this.messageCount = data.message_count;
        if (!this.meta || data.thread_metadata)
            this.meta = new ThreadMetadata_1.default(this, data.thread_metadata);
        if (data.type)
            this.private = data.type === 12 ? true : false;
        if (data.parent_id)
            this.parent = new PartialChannel({ id: data.parent_id, guild_id: data.guild_id, type: "text" }, this.client);
        if (data.guild_id)
            this.guild = new PartialGuild({ id: data.guild_id }, this.client);
        // @ts-ignore
        super._patch(data);
    }
}
module.exports = ThreadTextChannel;

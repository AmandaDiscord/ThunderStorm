"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const collection_1 = require("@discordjs/collection");
const NewsChannel_1 = __importDefault(require("./NewsChannel"));
const ThreadMetadata_1 = __importDefault(require("./ThreadMetadata"));
const ThreadMember_1 = __importDefault(require("./ThreadMember"));
const Constants_1 = __importDefault(require("../util/Constants"));
class ThreadNewsChannel extends NewsChannel_1.default {
    constructor(guild, data) {
        super(guild, data);
        this.memberCount = 0;
        this.messageCount = 0;
        this.members = new collection_1.Collection();
        this.defaultAutoArchiveDuration = 0;
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
            type: 10,
            owner_id: this.ownerId,
            member_count: this.memberCount,
            message_count: this.messageCount,
            thread_metadata: this.meta.toJSON(),
            parent_id: this.parent.id,
            guild_id: this.guild.id,
            default_auto_archive_duration: this.defaultAutoArchiveDuration
        });
    }
    // @ts-ignore
    _patch(data) {
        const PartialChannel = require("./Partial/PartialChannel");
        const PartialUser = require("./Partial/PartialUser");
        super._patch(data);
        if (data.owner_id) {
            this.ownerId = data.owner_id;
            this.owner = new PartialUser(this.client, { id: this.ownerId });
        }
        if (data.member_count !== undefined)
            this.memberCount = data.member_count;
        if (data.message_count !== undefined)
            this.messageCount = data.message_count;
        if (!this.meta || data.thread_metadata)
            this.meta = new ThreadMetadata_1.default(this, data.thread_metadata);
        if (data.parent_id)
            this.parent = new PartialChannel(this.client, { id: data.parent_id, guild_id: data.guild_id, type: Constants_1.default.ChannelTypes[10] });
    }
}
ThreadNewsChannel.default = ThreadNewsChannel;
module.exports = ThreadNewsChannel;

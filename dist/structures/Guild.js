"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const CategoryChannel_1 = __importDefault(require("./CategoryChannel"));
const Collection_1 = __importDefault(require("./Util/Collection"));
const GuildMember_1 = __importDefault(require("./GuildMember"));
const NewsChannel_1 = __importDefault(require("./NewsChannel"));
const Permissions_1 = __importDefault(require("./Permissions"));
const StageChannel_1 = __importDefault(require("./StageChannel"));
const TextChannel_1 = __importDefault(require("./TextChannel"));
const VoiceChannel_1 = __importDefault(require("./VoiceChannel"));
const Constants_1 = __importDefault(require("../Constants"));
const SnowflakeUtil_1 = __importDefault(require("./Util/SnowflakeUtil"));
class Guild {
    constructor(data, client) {
        this.client = client;
        this.partial = false;
        const PartialUser = require("./Partial/PartialUser");
        this.name = data.name || "unknown";
        this.id = data.id;
        this.available = data.unavailable != undefined ? !data.unavailable : true;
        this.memberCount = data.member_count || 0;
        this.ownerID = data.owner_id || Constants_1.default.SYSTEM_USER_ID;
        this.owner = new PartialUser({ id: this.ownerID }, client);
        this.icon = data.icon || null;
        this.permissions = new Permissions_1.default(BigInt(data.permissions || 0));
        this.members = data.members && Array.isArray(data.members) ? new Collection_1.default(data.members.map(member => [member.user.id, new GuildMember_1.default(member, client)])) : new Collection_1.default();
        this.channels = data.channels && Array.isArray(data.channels) ? new Collection_1.default(data.channels.map(channel => {
            let chan;
            if (channel.type === 2)
                chan = new VoiceChannel_1.default(channel, client);
            else if (channel.type === 4)
                chan = new CategoryChannel_1.default(channel, client);
            else if (channel.type === 5)
                chan = new NewsChannel_1.default(channel, client);
            else if (channel.type === 13)
                chan = new StageChannel_1.default(channel, client);
            else
                chan = new TextChannel_1.default(channel, client);
            return [channel.id, chan];
        })) : new Collection_1.default();
    }
    get createdTimestamp() {
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    get nameAcronym() {
        return this.name
            .replace(/'s /g, " ")
            .replace(/\w+/g, e => e[0])
            .replace(/\s/g, "");
    }
    fetch() {
        return Promise.resolve(this);
    }
    iconURL(options = { size: 128, format: "png", dynamic: true }) {
        if (!this.icon)
            return null;
        const format = this.icon.startsWith("a_") && options.dynamic ? "gif" : options.format;
        return `${Constants_1.default.BASE_CDN_URL}/icons/${this.id}/${this.icon}.${format}${!["gif", "webp"].includes(format) ? `?size=${options.size}` : ""}`;
    }
    toJSON() {
        return {
            name: this.name,
            id: this.id,
            unavailable: !this.available,
            member_count: this.memberCount,
            owner_id: this.ownerID,
            icon: this.icon,
            permissions: this.permissions.bitfield.toString(),
            members: [...this.members.values()].map(mem => mem.toJSON()),
            channels: [...this.channels.values()].map(chan => chan.toJSON())
        };
    }
    async fetchMembers(options) {
        if (typeof options === "string")
            return this.client._snow.guild.getGuildMember(this.id, options).then(d => new GuildMember_1.default(d, this.client));
        else {
            const payload = {};
            if (options.limit)
                payload["limit"] = options.limit;
            if (options.after)
                payload["after"] = options.after;
            const data = await this.client._snow.guild.getGuildMembers(this.id, payload);
            if (!data || data.length === 0)
                return null;
            if (!options.query)
                return data.map(d => new GuildMember_1.default(d, this.client));
            else if (options.ids)
                return data.filter(d => (d.user ? options.ids.includes(d.user.id) : false)).map(d => new GuildMember_1.default(d, this.client));
            else
                return data.filter(d => d.nick.includes(options.query) || (d.user ? d.user.username.includes(options.query) : false) || (d.user ? d.user.id.includes(options.query) : false) || (d.user ? `${d.user.username}#${d.user.discriminator}` === options.query : false)).map(d => new GuildMember_1.default(d, this.client));
        }
    }
}
module.exports = Guild;

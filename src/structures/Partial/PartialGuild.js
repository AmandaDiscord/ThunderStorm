"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Collection_1 = __importDefault(require("../../util/Collection"));
const PartialBase_1 = __importDefault(require("./PartialBase"));
const GuildApplicationCommandManager_1 = __importDefault(require("../../managers/GuildApplicationCommandManager"));
class PartialGuild extends PartialBase_1.default {
    constructor(client, data) {
        super(client, data);
        this.partialType = "Guild";
        this.memberCount = data.number || 0;
        this.available = data.unavailable ? !data.unavailable : true;
        this.name = data.name || "unknown";
        this.commands = new GuildApplicationCommandManager_1.default(this);
    }
    get me() {
        const GuildMember = require("../GuildMember");
        return new GuildMember(this.client, { guild_id: this.id, deaf: false, hoisted_role: this.id, joined_at: new Date().toISOString(), mute: false, nick: null, roles: [], user: this.client.user.toJSON() });
    }
    toString() {
        return this.name;
    }
    toJSON() {
        return {
            member_count: this.memberCount,
            unavailable: !this.available,
            name: this.name,
            ...super.toJSON()
        };
    }
    async fetchMembers(options) {
        const GuildMember = require("../GuildMember");
        if (typeof options === "string")
            return this.client._snow.guild.getGuildMember(this.id, options).then(d => d ? new GuildMember(this.client, d) : null);
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
                return data.map(d => new GuildMember(this.client, d));
            else if (options.ids)
                return data.filter(d => { var _a; return (d.user ? (_a = options.ids) === null || _a === void 0 ? void 0 : _a.includes(d.user.id) : false); }).map(d => new GuildMember(this.client, d));
            else
                return data.filter(d => { var _a; return options.query && ((_a = d.nick) === null || _a === void 0 ? void 0 : _a.includes(options.query)) || (d.user ? options.query && d.user.username.includes(options.query) : false) || (d.user ? options.query && d.user.id.includes(options.query) : false) || (d.user ? options.query && `${d.user.username}#${d.user.discriminator}` === options.query : false); }).map(d => new GuildMember(this.client, d));
        }
    }
    async fetchInvites() {
        const Invite = require("../Invite");
        const inviteItems = await this.client._snow.guild.getGuildInvites(this.id);
        const invites = new Collection_1.default();
        for (const inviteItem of inviteItems) {
            const invite = new Invite(this.client, inviteItem);
            invites.set(invite.code, invite);
        }
        return invites;
    }
}
module.exports = PartialGuild;

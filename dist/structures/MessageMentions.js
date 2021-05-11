"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Collection_1 = __importDefault(require("./Util/Collection"));
const GuildMember_1 = __importDefault(require("./GuildMember"));
const User_1 = __importDefault(require("./User"));
class MessageMentions {
    constructor(message, users, roles, everyone, crosspostedChannels) {
        var _a, _b;
        this.users = new Collection_1.default();
        this.members = new Collection_1.default();
        this.channels = new Collection_1.default();
        this.roles = new Collection_1.default();
        this.crossPostedChannels = new Collection_1.default();
        this.client = message.client;
        this.guild = message.guild;
        this._content = message.content;
        this.everyone = everyone;
        const PartialChannel = require("./Partial/PartialChannel");
        const PartialRole = require("./Partial/PartialRole");
        if (users) {
            for (const user of users) {
                if (user.member) {
                    const obj = Object.assign({}, user.member, { user: user });
                    this.members.set(user.id, new GuildMember_1.default(obj, this.client));
                }
                if (user.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id))
                    this.client.user._patch(user);
                this.users.set(user.id, user.id === ((_b = this.client.user) === null || _b === void 0 ? void 0 : _b.id) ? this.client.user : new User_1.default(user, this.client));
            }
        }
        const matches = this._content.match(MessageMentions.CHANNELS_PATTERN);
        if (matches) {
            for (const channel of matches.slice(1))
                this.channels.set(channel, new PartialChannel({ id: channel }, this.client));
        }
        if (roles && this.guild) {
            for (const role of roles)
                this.roles.set(role, new PartialRole({ id: role, guild_id: this.guild.id }, this.client));
        }
        if (crosspostedChannels) {
            const TextChannel = require("./TextChannel");
            const VoiceChannel = require("./VoiceChannel");
            const CategoryChannel = require("./CategoryChannel");
            const NewsChannel = require("./NewsChannel");
            const StageChannel = require("./StageChannel");
            const GuildChannel = require("./GuildChannel");
            for (const channel of crosspostedChannels) {
                let data;
                if (channel.type === 0)
                    data = new TextChannel(channel, this.client);
                else if (channel.type === 2)
                    data = new VoiceChannel(channel, this.client);
                else if (channel.type === 4)
                    data = new CategoryChannel(channel, this.client);
                else if (channel.type === 5)
                    data = new NewsChannel(channel, this.client);
                else if (channel.type === 13)
                    data = new StageChannel(channel, this.client);
                else
                    data = new GuildChannel(channel, this.client);
                this.crossPostedChannels.set(data.id, data);
            }
        }
    }
    toJSON() {
        return {
            mentions: [...this.users.values()].map(u => {
                const member = this.members.get(u.id);
                const value = u.toJSON();
                if (member) {
                    const mj = member.toJSON();
                    // @ts-ignore I know what I'm doing
                    delete mj.user;
                    Object.assign(value, { member: mj });
                }
                return value;
            }),
            mention_roles: [...this.roles.values()].map(r => r.id),
            mention_everyone: this.everyone,
            mention_channels: [...this.crossPostedChannels.values()].map(c => c.toJSON())
        };
    }
}
MessageMentions.EVERYONE_PATTERN = /@(everyone|here)/g;
MessageMentions.USERS_PATTERN = /<@!?(\d+)>/g; // context: https://github.com/discordjs/discord.js/blob/51551f544b80d7d27ab0b315da01dfc560b2c115/src/structures/MessageMentions.js#L211 (latest commit as of writing)
MessageMentions.ROLES_PATTERN = /<@&(\d+)>/g; // never EVER define an ID length because the length is not guaranteed forever and will only cause a hassle once it does change.
MessageMentions.CHANNELS_PATTERN = /<#(\d+)>/g; // The pErFoRmAnCe GaInS by specifying a length are non-existent here.
module.exports = MessageMentions;

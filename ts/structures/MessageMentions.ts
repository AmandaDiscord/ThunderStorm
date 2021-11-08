import Collection from "../util/Collection";
import Constants from "../util/Constants";

import GuildMember from "./GuildMember";
import User from "./User";

class MessageMentions {
	public static EVERYONE_PATTERN = /@(everyone|here)/g;
	public static USERS_PATTERN = /<@!?(\d+)>/g; // context: https://github.com/discordjs/discord.js/blob/51551f544b80d7d27ab0b315da01dfc560b2c115/src/structures/MessageMentions.js#L211 (latest commit as of writing)
	public static ROLES_PATTERN = /<@&(\d+)>/g; // never EVER define an ID length because the length is not guaranteed forever and will only cause a hassle once it does change.
	public static CHANNELS_PATTERN = /<#(\d+)>/g; // The pErFoRmAnCe GaInS by specifying a length are non-existent here.

	public client: import("../client/Client");
	public guild: import("./Partial/PartialGuild") | null;
	private _content: string | null;

	public everyone: boolean;
	public users: Collection<string, import("./User")> = new Collection();
	public members: Collection<string, import("./GuildMember")> = new Collection();
	public channels: Collection<string, import("./Partial/PartialChannel")> = new Collection();
	public roles: Collection<string, import("./Partial/PartialRole")> = new Collection();
	public crosspostedChannels: Collection<string, import("./GuildChannel")> = new Collection();

	public constructor(message: import("./Message"), users: Array<import("discord-typings").UserData & { member?: import("discord-typings").MemberData }> | undefined, roles: Array<string> | undefined, everyone: boolean, crosspostedChannels: Array<import("discord-typings").ChannelMentionData> | undefined) {
		this.client = message.client;
		this.guild = message.guild;
		this._content = message.content;
		this.everyone = everyone;

		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");
		const PartialRole: typeof import("./Partial/PartialRole") = require("./Partial/PartialRole");

		if (users) {
			for (const user of users) {
				if (user.member) {
					const obj = Object.assign({}, user.member, { user: user });
					this.members.set(user.id, new GuildMember(this.client, obj));
				}
				if (user.id === this.client.user?.id) this.client.user._patch(user);
				this.users.set(user.id, user.id === this.client.user?.id ? this.client.user : new User(this.client, user));
			}
		}

		const matches = (this._content || "").match(MessageMentions.CHANNELS_PATTERN);
		if (matches) {
			for (const channel of matches.slice(1)) this.channels.set(channel, new PartialChannel(this.client, { id: channel, guild_id: this.guild?.id, type: this.guild?.id ? Constants.ChannelTypes[0] : Constants.ChannelTypes[1] }));
		}

		if (roles && this.guild) {
			for (const role of roles) this.roles.set(role, new PartialRole(this.client, { id: role, guild_id: this.guild.id }));
		}

		if (crosspostedChannels) {
			const TextChannel: typeof import("./TextChannel") = require("./TextChannel");
			const VoiceChannel: typeof import("./VoiceChannel") = require("./VoiceChannel");
			const CategoryChannel: typeof import("./CategoryChannel") = require("./CategoryChannel");
			const NewsChannel: typeof import("./NewsChannel") = require("./NewsChannel");
			const StoreChannel: typeof import("./StoreChannel") = require("./StoreChannel");
			const StageChannel: typeof import("./StageChannel") = require("./StageChannel");
			const GuildChannel: typeof import("./GuildChannel") = require("./GuildChannel");
			const Channel: typeof import("./Channel") = require("./Channel");
			for (const channel of crosspostedChannels) {
				let data;
				if (channel.type === 0 && this.guild) data = new TextChannel(this.guild, channel as any);
				else if (channel.type === 2 && this.guild) data = new VoiceChannel(this.guild, channel as any);
				else if (channel.type === 4 && this.guild) data = new CategoryChannel(this.guild, channel as any);
				else if (channel.type === 5 && this.guild) data = new NewsChannel(this.guild, channel as any);
				else if (channel.type === 6 && this.guild) data = new StoreChannel(this.guild, channel as any);
				else if (channel.type === 13 && this.guild) data = new StageChannel(this.guild, channel as any);
				else if (this.guild) data = new GuildChannel(this.guild, channel as any);
				else data = new Channel(this.client, channel as any);
				this.crosspostedChannels.set(data.id, data as any);
			}
		}
	}

	public toJSON() {
		return {
			mentions: [...this.users.values()].map(u => {
				const member = this.members.get(u.id);
				const value: import("discord-typings").UserData & { member?: import("discord-typings").MemberData } = u.toJSON();
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
			mention_channels: [...this.crosspostedChannels.values()].map(c => c.toJSON()) as Array<import("discord-typings").ChannelMentionData>
		};
	}
}

export = MessageMentions;

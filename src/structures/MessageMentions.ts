import Collection from "./Util/Collection";

import GuildMember from "./GuildMember";
import User from "./User";

class MessageMentions {
	public static EVERYONE_PATTERN = /@(everyone|here)/g;
	public static USERS_PATTERN = /<@!?(\d+)>/g; // context: https://github.com/discordjs/discord.js/blob/51551f544b80d7d27ab0b315da01dfc560b2c115/src/structures/MessageMentions.js#L211 (latest commit as of writing)
	public static ROLES_PATTERN = /<@&(\d+)>/g; // never EVER define an ID length because the length is not guaranteed forever and will only cause a hassle once it does change.
	public static CHANNELS_PATTERN = /<#(\d+)>/g; // The pErFoRmAnCe GaInS by specifying a length are non-existent here.

	public client: import("./Client");
	public guild: import("./Partial/PartialGuild") | null;
	private _content: string;

	public everyone: boolean;
	public users: Collection<string, import("./User")> = new Collection();
	public members: Collection<string, import("./GuildMember")> = new Collection();
	public channels: Collection<string, import("./Partial/PartialChannel")> = new Collection();
	public roles: Collection<string, import("./Partial/PartialRole")> = new Collection();
	public crossPostedChannels: Collection<string, import("./GuildChannel")> = new Collection();

	public constructor(message: import("./Message"), users: Array<import("@amanda/discordtypings").UserData & { member?: import("@amanda/discordtypings").MemberData }> | undefined, roles: Array<string> | undefined, everyone: boolean, crosspostedChannels: Array<import("@amanda/discordtypings").ChannelMentionData> | undefined) {
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
					this.members.set(user.id, new GuildMember(obj, this.client));
				}
				if (user.id === this.client.user?.id) this.client.user._patch(user);
				this.users.set(user.id, user.id === this.client.user?.id ? this.client.user : new User(user, this.client));
			}
		}

		const matches = this._content.match(MessageMentions.CHANNELS_PATTERN);
		if (matches) {
			for (const channel of matches.slice(1)) this.channels.set(channel, new PartialChannel({ id: channel }, this.client));
		}

		if (roles && this.guild) {
			for (const role of roles) this.roles.set(role, new PartialRole({ id: role, guild_id: this.guild.id }, this.client));
		}

		if (crosspostedChannels) {
			const TextChannel: typeof import("./TextChannel") = require("./TextChannel");
			const VoiceChannel: typeof import("./VoiceChannel") = require("./VoiceChannel");
			const CategoryChannel: typeof import("./CategoryChannel") = require("./CategoryChannel");
			const NewsChannel: typeof import("./NewsChannel") = require("./NewsChannel");
			const StageChannel: typeof import("./StageChannel") = require("./StageChannel");
			const GuildChannel: typeof import("./GuildChannel") = require("./GuildChannel");
			for (const channel of crosspostedChannels) {
				let data;
				if (channel.type === 0) data = new TextChannel(channel as any, this.client);
				else if (channel.type === 2) data = new VoiceChannel(channel as any, this.client);
				else if (channel.type === 4) data = new CategoryChannel(channel as any, this.client);
				else if (channel.type === 5) data = new NewsChannel(channel as any, this.client);
				else if (channel.type === 13) data = new StageChannel(channel as any, this.client);
				else data = new GuildChannel(channel as any, this.client);
				this.crossPostedChannels.set(data.id, data);
			}
		}
	}

	public toJSON() {
		return {
			mentions: [...this.users.values()].map(u => {
				const member = this.members.get(u.id);
				const value: import("@amanda/discordtypings").UserData & { member?: import("@amanda/discordtypings").MemberData } = u.toJSON();
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
			mention_channels: [...this.crossPostedChannels.values()].map(c => c.toJSON()) as Array<import("@amanda/discordtypings").ChannelMentionData>
		};
	}
}

export = MessageMentions;

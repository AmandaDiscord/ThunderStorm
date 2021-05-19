import TextBasedChannel from "./Interfaces/TextBasedChannel";

import User from "./User";

class GuildMember {
	public client: import("./Client");
	public partial: false;
	public user!: import("./User");
	public id!: string;
	public nickname: string | null = null;
	public deaf = false;
	public mute = false;
	public joinedAt: Date = new Date();
	public joinedTimestamp!: number;
	public premiumSince: string | null = null;
	public roles: Array<string> = [];
	public guild: import("./Partial/PartialGuild") | null = null;

	public constructor(data: import("@amanda/discordtypings").MemberData & { user: import("@amanda/discordtypings").UserData; guild_id?: string }, client: import("./Client")) {
		this.client = client;
		this.partial = false;

		const PartialGuild = require("./Partial/PartialGuild");
		if (data.user) {
			if (data.user.id === this.client.user?.id) this.client.user._patch(data.user);
			this.user = data.user.id === this.client.user?.id ? this.client.user : new User(data.user, this.client);
			this.id = data.user.id;
		}
		if (data.nick !== undefined) this.nickname = data.nick;
		if (data.deaf !== undefined) this.deaf = data.deaf;
		if (data.mute !== undefined) this.mute = data.mute;
		if (data.joined_at) {
			this.joinedAt = new Date(data.joined_at);
			this.joinedTimestamp = this.joinedAt.getTime();
		}
		if (data.premium_since !== undefined) this.premiumSince = data.premium_since;
		if (data.roles && Array.isArray(data.roles)) this.roles = data.roles;
		if (!this.guild || data.guild_id) this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, this.client) : null;
	}

	public get displayName() {
		return this.nickname || this.user.username;
	}

	/**
	 * A combination of the member's tag and nickname
	 * - Nickname set:   PapiOphidian#0110 (Async)
	 * - Nickname unset: PapiOphidian#0110
	 */
	public get displayTag() {
		return this.nickname ? `${this.user.tag} (${this.nickname})` : this.user.tag;
	}

	public toString() {
		return `<@${this.id}>`;
	}

	public toJSON() {
		return {
			id: this.id,
			nick: this.nickname,
			mute: this.mute,
			joined_at: this.joinedAt.toISOString(),
			premium_since: this.premiumSince,
			user: this.user.toJSON(),
			roles: this.roles,
			guild_id: this.guild ? this.guild.id : undefined
		};
	}

	public send(content: import("../Types").StringResolvable, options: Exclude<import("../Types").MessageOptions, "suppress"> = {}) {
		return TextBasedChannel.send(this, content, options);
	}

	public _patch(data: import("@amanda/discordtypings").MemberData & { user: import("@amanda/discordtypings").UserData; guild_id?: string }) {
		const PartialGuild = require("./Partial/PartialGuild");
		if (data.user) {
			if (data.user.id === this.client.user?.id) this.client.user._patch(data.user);
			this.user = data.user.id === this.client.user?.id ? this.client.user : new User(data.user, this.client);
			this.id = data.user.id;
		}
		if (data.nick !== undefined) this.nickname = data.nick;
		if (data.deaf !== undefined) this.deaf = data.deaf;
		if (data.mute !== undefined) this.mute = data.mute;
		if (data.joined_at) {
			this.joinedAt = new Date(data.joined_at);
			this.joinedTimestamp = this.joinedAt.getTime();
		}
		if (data.premium_since !== undefined) this.premiumSince = data.premium_since;
		if (data.roles && Array.isArray(data.roles)) this.roles = data.roles;
		if (!this.guild || data.guild_id) this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, this.client) : null;
	}
}

export = GuildMember;

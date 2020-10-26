import TextBasedChannel from "./Interfaces/TextBasedChannel";

import User from "./User";

class GuildMember {
	public client: import("./Client");
	public partial: false;
	public user: import("./User");
	public id: string;
	public nickname: string;
	public deaf: boolean;
	public mute: boolean;
	public joinedAt: Date;
	public premiumSince: string | null;
	public roles: Array<string>;
	public guild: import("./Partial/PartialGuild") | null;

	public constructor(data: import("@amanda/discordtypings").MemberData & { user: import("@amanda/discordtypings").UserData; }, client: import("./Client")) {
		const PartialGuild = require("./Partial/PartialGuild");

		this.client = client;
		this.partial = false;

		this.user = data.user.id === client.user?.id ? client.user : new User(data.user, client);
		this.id = data.user.id;
		this.nickname = data.nick;
		this.deaf = data.deaf || false;
		this.mute = data.mute || false;
		this.joinedAt = new Date(data.joined_at);
		this.premiumSince = data.premium_since || null;
		this.roles = data.roles || [];

		// @ts-ignore
		this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, client) : null;
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
			joined_at: this.joinedAt,
			premium_since: this.premiumSince,
			user: this.user.toJSON(),
			roles: this.roles,
			guild_id: this.guild ? this.guild.id : undefined
		};
	}

	public send(content: import("../types").StringResolvable, options: import("../types").MessageOptions = {}) {
		return TextBasedChannel.send(this, content, options);
	}
}

export = GuildMember;

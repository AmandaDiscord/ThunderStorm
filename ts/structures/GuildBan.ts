// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Base from "./Base";

// @ts-ignore
class GuildBan extends Base {
	public guild: import("./Partial/PartialGuild");
	public user!: import("./User");
	public reason: string | null = null;

	public static readonly default = GuildBan;

	public constructor(client: import("../client/Client"), data: import("discord-typings").GuildBanAddData & { reason?: string }, guild: import("./Partial/PartialGuild")) {
		super(client);

		this.id = data.user.id;
		this.guild = guild;

		this._patch(data);
	}

	public _patch(data: import("discord-typings").GuildBanAddData & { reason?: string }) {
		const User: typeof import("./User") = require("./User");
		if (data.user) this.user = new User(this.client, data.user);
		if (data.reason) this.reason = data.reason;
	}

	public get partial() {
		return true;
	}

	public async fetch() {
		const bans = await this.client._snow.guild.getGuildBans(this.guild.id);
		return (bans || []).find(ban => ban.user.id === this.user.id) || null;
	}
}

export = GuildBan;

// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Channel from "./Channel";
import { Collection } from "@discordjs/collection";
import PermissionOverwrites from "./PermissionOverwrites";

// @ts-ignore
class GuildChannel extends Channel {
	public parentId: string | null = null;
	public rawPosition = 0;
	public guild!: import("./Partial/PartialGuild");
	public permissionOverwrites!: Collection<string, PermissionOverwrites>;

	public static readonly default = GuildChannel;

	public constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").GuildChannelData) {
		super(guild.client, data);

		this.guild = guild;
		this.permissionOverwrites = this.permissionOverwrites || new Collection();
	}

	// @ts-ignore
	public toJSON(): import("discord-typings").GuildChannelData & { name: string } {
		return {
			guild_id: this.guild.id,
			parent_id: this.parentId,
			position: this.rawPosition,
			permission_overwrites: [...this.permissionOverwrites.values()].map(i => i.toJSON()),
			...super.toJSON()
		} as import("discord-typings").GuildChannelData & { name: string };
	}

	public _patch(data: import("discord-typings").GuildChannelData) {
		const PartialGuild: typeof import("./Partial/PartialGuild") = require("./Partial/PartialGuild");
		super._patch(data);

		if (!this.parentId || data.parent_id !== undefined) this.parentId = data.parent_id || null;
		if (data.position !== undefined) this.rawPosition = data.position;
		if (data.permission_overwrites && Array.isArray(data.permission_overwrites)) {
			this.permissionOverwrites = new Collection();
			for (const i of data.permission_overwrites) this.permissionOverwrites.set(i.id, new PermissionOverwrites(this, i));
		}
		if (data.guild_id) this.guild = new PartialGuild(this.client, { id: data.guild_id });
	}
}

export = GuildChannel;

import Channel from "./Channel";
import Collection from "./Util/Collection";
import PermissionOverwrites from "./PermissionOverwrites";

class GuildChannel extends Channel {
	public parentID: string | null = null;
	public position = 0;
	public guild!: import("./Partial/PartialGuild");
	public permissionOverwrites: Collection<string, PermissionOverwrites> = new Collection();

	public constructor(data: import("@amanda/discordtypings").GuildChannelData, client: import("./Client")) {
		super(data, client);

		const PartialGuild = require("./Partial/PartialGuild");

		if (!this.parentID || data.parent_id !== undefined) this.parentID = data.parent_id || null;
		if (data.position !== undefined) this.position = data.position;
		if (data.permission_overwrites && Array.isArray(data.permission_overwrites)) for (const i of data.permission_overwrites) this.permissionOverwrites.set(i.id, new PermissionOverwrites(this, i));
		if (data.guild_id) this.guild = new PartialGuild({ id: data.guild_id }, this.client);
	}

	public toJSON(): import("@amanda/discordtypings").GuildChannelData {
		// @ts-ignore
		return {
			guild_id: this.guild.id,
			parent_id: this.parentID,
			position: this.position,
			permission_overwrites: [...this.permissionOverwrites.values()].map(i => i.toJSON()),
			...super.toJSON()
		};
	}

	public _patch(data: import("@amanda/discordtypings").GuildChannelData) {
		const PartialGuild = require("./Partial/PartialGuild");

		if (!this.parentID || data.parent_id !== undefined) this.parentID = data.parent_id || null;
		if (data.position !== undefined) this.position = data.position;
		if (data.permission_overwrites && Array.isArray(data.permission_overwrites)) for (const i of data.permission_overwrites) this.permissionOverwrites.set(i.id, new PermissionOverwrites(this, i));
		if (data.guild_id) this.guild = new PartialGuild({ id: data.guild_id }, this.client);

		super._patch(data);
	}
}

export = GuildChannel;

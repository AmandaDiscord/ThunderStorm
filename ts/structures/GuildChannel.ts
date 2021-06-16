import Channel from "./Channel";
import Collection from "../util/Collection";
import PermissionOverwrites from "./PermissionOverwrites";

class GuildChannel extends Channel {
	public parentID: string | null = null;
	public rawPosition = 0;
	public guild!: import("./Partial/PartialGuild");
	public permissionOverwrites!: Collection<string, PermissionOverwrites>;

	public constructor(guild: import("./Partial/PartialGuild"), data: import("@amanda/discordtypings").GuildChannelData) {
		super(guild.client, data);

		this.guild = guild;
		this.permissionOverwrites = this.permissionOverwrites || new Collection();
	}

	public toJSON(): import("@amanda/discordtypings").GuildChannelData {

		return {
			guild_id: this.guild.id,
			parent_id: this.parentID,
			position: this.rawPosition,
			permission_overwrites: [...this.permissionOverwrites.values()].map(i => i.toJSON()),
			...super.toJSON()
		};
	}

	public _patch(data: import("@amanda/discordtypings").GuildChannelData) {
		const PartialGuild: typeof import("./Partial/PartialGuild") = require("./Partial/PartialGuild");
		super._patch(data);

		if (!this.parentID || data.parent_id !== undefined) this.parentID = data.parent_id || null;
		if (data.position !== undefined) this.rawPosition = data.position;
		if (data.permission_overwrites && Array.isArray(data.permission_overwrites)) {
			this.permissionOverwrites = new Collection();
			for (const i of data.permission_overwrites) this.permissionOverwrites.set(i.id, new PermissionOverwrites(this, i));
		}
		if (data.guild_id) this.guild = new PartialGuild(this.client, { id: data.guild_id });
	}
}

export = GuildChannel;

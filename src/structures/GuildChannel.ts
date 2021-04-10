import Channel from "./Channel";
import Collection from "./Util/Collection";
import PermissionOverwrites from "./PermissionOverwrites";

class GuildChannel extends Channel {
	public parentID: string | null;
	public position: number;
	public guild: import("./Partial/PartialGuild");
	public permissionOverwrites: Collection<string, PermissionOverwrites>;

	public constructor(data: import("@amanda/discordtypings").GuildChannelData, client: import("./Client")) {
		super(data, client);

		const PartialGuild = require("./Partial/PartialGuild");

		this.parentID = data.parent_id || null;
		this.position = data.position;
		this.permissionOverwrites = new Collection((data.permission_overwrites || []).map(i => [i.id, new PermissionOverwrites(this, i)]));
		this.guild = new PartialGuild({ id: data.guild_id }, client);
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
}

export = GuildChannel;

import Channel from "./Channel";

class GuildChannel extends Channel {
	public parentID: string | null;
	public position: number;
	public guild: import("./Partial/PartialGuild");

	public constructor(data: import("@amanda/discordtypings").GuildChannelData, client: import("./Client")) {
		super(data, client);

		const PartialGuild = require("./Partial/PartialGuild");

		this.parentID = data.parent_id || null;
		this.position = data.position;
		this.guild = new PartialGuild({ id: data.guild_id }, client);
	}

	public toJSON() {
		return {
			guild_id: this.guild.id,
			parent_id: this.parentID,
			position: this.position,
			...super.toJSON()
		};
	}
}

export = GuildChannel;

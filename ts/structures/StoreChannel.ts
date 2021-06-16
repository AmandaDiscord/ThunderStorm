import GuildChannel from "./GuildChannel";

class StoreChannel extends GuildChannel {
	public nsfw: boolean;
	public type: "store" = "store";

	public constructor(guild: import("./Partial/PartialGuild"), data: import("@amanda/discordtypings").TextChannelData) {
		super(guild, data);
		this.nsfw = Boolean(data.nsfw);
	}

	public _patch(data: import("@amanda/discordtypings").TextChannelData) {
		super._patch(data);

		if ("nsfw" in data) {
			this.nsfw = Boolean(data.nsfw);
		}
	}
}

export = StoreChannel;

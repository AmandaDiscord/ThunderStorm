import GuildChannel from "./GuildChannel";

class CategoryChannel extends GuildChannel {
	public nsfw: boolean;
	public type: "category";

	public constructor(data: import("@amanda/discordtypings").CategoryChannelData, client: import("./Client")) {
		super(data, client);

		this.type = "category";
		this.nsfw = data.nsfw || false;
	}

	public toJSON(): import("@amanda/discordtypings").CategoryChannelData {
		return Object.assign(super.toJSON(), { type: 4 as const, nsfw: this.nsfw });
	}
}

export = CategoryChannel;

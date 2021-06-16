import GuildChannel from "./GuildChannel";

class CategoryChannel extends GuildChannel {
	public nsfw!: boolean;
	public type: "category" = "category";

	public constructor(guild: import("./Partial/PartialGuild"), data: import("@amanda/discordtypings").CategoryChannelData) {
		super(guild, data);

		this._patch(data);
	}

	public toJSON(): import("@amanda/discordtypings").CategoryChannelData {
		return Object.assign(super.toJSON(), { type: 4 as const, nsfw: this.nsfw });
	}

	public _patch(data: import("@amanda/discordtypings").CategoryChannelData) {
		if (data.nsfw) this.nsfw = data.nsfw || false;
		super._patch(data);
	}
}

export = CategoryChannel;

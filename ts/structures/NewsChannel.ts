import TextChannel from "./TextChannel";

class NewsChannel extends TextChannel {
	// @ts-ignore
	public type: "news" = "news";

	public constructor(guild: import("./Partial/PartialGuild"), data: import("@amanda/discordtypings").NewsChannelData) {
		// @ts-ignore
		super(guild, data);
	}

	// @ts-ignore
	public toJSON(): import("@amanda/discordtypings").NewsChannelData {
		return Object.assign(super.toJSON(), { type: 5 as const });
	}
}

export = NewsChannel;

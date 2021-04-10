import TextChannel from "./TextChannel";

class NewsChannel extends TextChannel {
	// @ts-ignore
	public type: "news"

	public constructor(data: import("@amanda/discordtypings").NewsChannelData, client: import("./Client")) {
		// @ts-ignore
		super(data, client);

		this.type = "news";
	}

	// @ts-ignore
	public toJSON(): import("@amanda/discordtypings").NewsChannelData {
		return Object.assign(super.toJSON(), { type: 5 as const });
	}
}

export = NewsChannel;

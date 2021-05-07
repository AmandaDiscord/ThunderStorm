import VoiceChannel from "./VoiceChannel";

class StageChannel extends VoiceChannel {
	// @ts-ignore
	public type: "stage" = "stage";

	public constructor(data: import("@amanda/discordtypings").StageChannelData, client: import("./Client")) {
		// @ts-ignore lol type 13 isn't assignable to type 3
		super(data, client);
	}

	// @ts-ignore
	public toJSON(): import("@amanda/discordtypings").StageChannelData {
		return Object.assign(super.toJSON(), { type: 13 as const });
	}
}

export = StageChannel;

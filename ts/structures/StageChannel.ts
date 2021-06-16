import VoiceChannel from "./VoiceChannel";

class StageChannel extends VoiceChannel {
	// @ts-ignore
	public type: "stage" = "stage";

	public constructor(guild: import("./Partial/PartialGuild"), data: import("@amanda/discordtypings").StageChannelData) {
		// @ts-ignore lol type 13 isn't assignable to type 3
		super(guild, data);
	}

	// @ts-ignore
	public toJSON(): import("@amanda/discordtypings").StageChannelData {
		return Object.assign(super.toJSON(), { type: 13 as const });
	}
}

export = StageChannel;

import GuildChannel from "./GuildChannel";

import Constants from "../util/Constants";

class StoreChannel extends GuildChannel {
	public nsfw: boolean;
	public type: typeof Constants.ChannelTypes[6] = Constants.ChannelTypes[6];

	public constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").StoreChannelData) {
		super(guild, data);
		this.nsfw = Boolean(data.nsfw);
	}

	public _patch(data: import("discord-typings").StageChannelData) {
		super._patch(data);

		if ("nsfw" in data) {
			this.nsfw = Boolean((data as unknown as import("discord-typings").TextChannelData).nsfw);
		}
	}
}

export = StoreChannel;

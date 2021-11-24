// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import GuildChannel from "./GuildChannel";

import Constants from "../util/Constants";

// @ts-ignore
class CategoryChannel extends GuildChannel {
	public nsfw!: boolean;
	public type: typeof Constants.ChannelTypes[4] = Constants.ChannelTypes[4];

	public static readonly default = CategoryChannel;

	public constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").CategoryChannelData) {
		super(guild, data);
	}

	public toJSON(): import("discord-typings").CategoryChannelData {
		return Object.assign(super.toJSON(), { type: 4 as const, nsfw: this.nsfw });
	}

	public _patch(data: import("discord-typings").CategoryChannelData) {
		if (data.nsfw) this.nsfw = data.nsfw || false;
		super._patch(data);
	}
}

export = CategoryChannel;

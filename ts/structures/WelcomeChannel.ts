import Base from "./Base";
import Emoji from "./Emoji";

class WelcomeChannel extends Base {
	public guild: import("./Guild") | import("./Partial/PartialGuild") | import("./InviteGuild");
	public description: string;
	private _emoji: { name: string, id: string | null };
	public channelId: string;

	public constructor(guild: import("./Guild") | import("./Partial/PartialGuild") | import("./InviteGuild"), data: import("discord-typings").WelcomeScreenChannelData) {
		super(guild.client);

		this.guild = guild;
		this.description = data.description as string;

		this._emoji = {
			name: data.emoji_name || "",
			id: data.emoji_id
		};
		this.channelId = data.channel_id;
	}

	public get channel() {
		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");
		const PartialGuild: typeof import("./Partial/PartialGuild") = require("./Partial/PartialGuild");
		const pc = new PartialChannel(this.client, { id: this.channelId, guild_id: this.guild.id });
		if (this.guild instanceof PartialGuild) pc.guild = this.guild;
		else pc.guild = new PartialGuild(this.client, { id: this.guild.id });
		return pc;
	}

	public get emoji() {
		return new Emoji(this.client, this._emoji);
	}
}

export = WelcomeChannel;

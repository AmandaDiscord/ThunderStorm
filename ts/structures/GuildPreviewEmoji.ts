// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import BaseGuildEmoji from "./BaseGuildEmoji";

class GuildPreviewEmoji extends BaseGuildEmoji {
	public guild!: import("./GuildPreview");

	public static readonly default = GuildPreviewEmoji;

	public get roles() {
		return new Set(this._roles);
	}
}

export = GuildPreviewEmoji;

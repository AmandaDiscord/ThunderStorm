import BaseGuildEmoji from "./BaseGuildEmoji";

class GuildPreviewEmoji extends BaseGuildEmoji {
	public guild!: import("./GuildPreview");

	public get roles() {
		return new Set(this._roles);
	}
}

export = GuildPreviewEmoji;

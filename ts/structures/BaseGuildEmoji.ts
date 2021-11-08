import Emoji from "./Emoji";

abstract class BaseGuildEmoji extends Emoji {
	public id!: string;
	public guild: import("./Guild") | import("./Partial/PartialGuild") | import("./GuildPreview");
	public requiresColons: boolean | null;
	public managed: boolean | null;
	public available: boolean | null;
	public _roles: Array<string>;

	public constructor(client: import("../client/Client"), data: import("discord-typings").EmojiData, guild: import("./Guild") | import("./Partial/PartialGuild") | import("./GuildPreview")) {
		super(client, data);

		this.guild = guild;

		this.requiresColons = null;
		this.managed = null;
		this.available = null;

		this._roles = [];

		this._patch(data);
	}

	public _patch(data: import("discord-typings").EmojiData) {
		if (data.name) this.name = data.name;

		if (typeof data.require_colons !== "undefined") this.requiresColons = data.require_colons;
		if (typeof data.managed !== "undefined") this.managed = data.managed;
		if (typeof data.available !== "undefined") this.available = data.available;

		if (data.roles) this._roles = data.roles;
	}
}

export = BaseGuildEmoji;

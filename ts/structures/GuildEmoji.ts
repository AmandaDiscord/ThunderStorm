import Collection from "../util/Collection";
import BaseGuildEmoji from "./BaseGuildEmoji";
import { Error } from "../errors";
import PartialRole from "./Partial/PartialRole";

class GuildEmoji extends BaseGuildEmoji {
	public author: import("./User") | null = null;

	public constructor(client: import("../client/Client"), data: import("discord-typings").EmojiData, guild: import("./Guild") | import("./Partial/PartialGuild")) {
		super(client, data, guild);
	}

	public _clone() {
		const clone = super._clone();
		clone._roles = this._roles.slice();
		return clone;
	}

	public _patch(data: import("discord-typings").EmojiData) {
		super._patch(data);
	}

	public get roles() {
		return new Collection(this._roles.map(i => [i, new PartialRole(this.client, { id: i, guild_id: this.guild.Id })]));
	}

	public async fetchAuthor(): Promise<import("./User")> {
		if (this.managed) {
			throw new Error("EMOJI_MANAGED");
		}
		const data = await this.client._snow.guildAssets.getEmoji(this.guild.Id, this.Id);
		this._patch(data);
		return this.author as import("./User");
	}

	public async edit(data: import("../Types").GuildEmojiEditData): Promise<this> {
		const roles = data.roles ? (data.roles as Collection<string, import("./Role") | string>).map(r => typeof r === "string" ? r : r.Id) : undefined;
		const newData = await this.client._snow.guildAssets.updateEmoji(this.guild.Id, this.Id, { name: data.name, roles });
		const clone = this._clone();
		clone._patch(newData);
		return clone;
	}

	public setName(name: string): Promise<this> {
		return this.edit({ name });
	}

	public async delete(): Promise<this> {
		await this.client._snow.guildAssets.deleteEmoji(this.guild.Id, this.Id);
		return this;
	}

	public equals(other: GuildEmoji | import("discord-typings").EmojiData): boolean {
		if (other instanceof GuildEmoji) {
			return (
				other.Id === this.Id &&
				other.name === this.name &&
				other.managed === this.managed &&
				other.available === this.available &&
				other.requiresColons === this.requiresColons &&
				other.roles.size === this.roles.size &&
				other.roles.every(role => this.roles.has(role.Id))
			);
		} else {
			return (
				other.id === this.Id &&
				other.name === this.name &&
				!!other.roles &&
				other.roles.length === this.roles.size &&
				other.roles.every(role => this.roles.has(role))
			);
		}
	}
}

export = GuildEmoji;

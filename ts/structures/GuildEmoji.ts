// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import { Collection } from "@discordjs/collection";
import BaseGuildEmoji from "./BaseGuildEmoji";
import { Error } from "../errors";
import PartialRole from "./Partial/PartialRole";

class GuildEmoji extends BaseGuildEmoji {
	public author: import("./User") | null = null;

	public static readonly default = GuildEmoji;

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
		return new Collection(this._roles.map(i => [i, new PartialRole(this.client, { id: i, guild_id: this.guild.id })]));
	}

	public async fetchAuthor(): Promise<import("./User")> {
		if (this.managed) {
			throw new Error("EMOJI_MANAGED");
		}
		const data = await this.client._snow.guildAssets.getEmoji(this.guild.id, this.id);
		this._patch(data);
		return this.author as import("./User");
	}

	public async edit(data: import("../Types").GuildEmojiEditData): Promise<this> {
		const roles = data.roles ? (data.roles as Collection<string, import("./Role") | string>).map(r => typeof r === "string" ? r : r.id) : undefined;
		const newData = await this.client._snow.guildAssets.updateEmoji(this.guild.id, this.id, { name: data.name, roles });
		const clone = this._clone();
		clone._patch(newData);
		return clone;
	}

	public setName(name: string): Promise<this> {
		return this.edit({ name });
	}

	public async delete(): Promise<this> {
		await this.client._snow.guildAssets.deleteEmoji(this.guild.id, this.id);
		return this;
	}

	public equals(other: GuildEmoji | import("discord-typings").EmojiData): boolean {
		if (other instanceof GuildEmoji) {
			return (
				other.id === this.id &&
				other.name === this.name &&
				other.managed === this.managed &&
				other.available === this.available &&
				other.requiresColons === this.requiresColons &&
				other.roles.size === this.roles.size &&
				other.roles.every(role => this.roles.has(role.id))
			);
		} else {
			return (
				other.id === this.id &&
				other.name === this.name &&
				!!other.roles &&
				other.roles.length === this.roles.size &&
				other.roles.every(role => this.roles.has(role))
			);
		}
	}
}

export = GuildEmoji;

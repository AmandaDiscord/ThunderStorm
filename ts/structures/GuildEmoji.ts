import Collection from "../util/Collection";
import BaseGuildEmoji from "./BaseGuildEmoji";
import { Error } from "../errors";
import PartialRole from "./Partial/PartialRole";

class GuildEmoji extends BaseGuildEmoji {
	public author: import("./User") | null = null;

	public constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").EmojiData, guild: import("./Guild") | import("./Partial/PartialGuild")) {
		super(client, data, guild);
	}

	public _clone() {
		const clone = super._clone();
		clone._roles = this._roles.slice();
		return clone;
	}

	public _patch(data: import("@amanda/discordtypings").EmojiData) {
		super._patch(data);
	}

	public get roles() {
		return new Collection(this._roles.map(i => [i, new PartialRole(this.client, { id: i, guild_id: this.guild.id })]));
	}

	public async fetchAuthor(): Promise<import("./User")> {
		if (this.managed) {
			throw new Error("EMOJI_MANAGED");
		}
		const data = await this.client._snow.emoji.getEmoji(this.guild.id, this.id);
		this._patch(data);
		return this.author as import("./User");
	}

	public async edit(data: import("../Types").GuildEmojiEditData): Promise<this> {
		// @ts-ignore
		const roles = data.roles ? data.roles.map(r => r.id || r) : undefined;
		const newData = await this.client._snow.emoji.updateEmoji(this.guild.id, this.id, { name: data.name, roles });
		const clone = this._clone();
		clone._patch(newData);
		return clone;
	}

	public setName(name: string): Promise<this> {
		return this.edit({ name });
	}

	public async delete(): Promise<this> {
		await this.client._snow.emoji.deleteEmoji(this.guild.id, this.id);
		return this;
	}

	public equals(other: GuildEmoji | import("@amanda/discordtypings").EmojiData): boolean {
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

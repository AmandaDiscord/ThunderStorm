import SnowflakeUtil from "../util/SnowflakeUtil";

import Base from "./Base";

class Emoji extends Base {
	public animated = false;
	public name!: string;
	// @ts-ignore
	public id: string | null;
	public deleted = false;

	public constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").EmojiData) {
		super(client);

		this.id = data.id || null;
		this.name = data.name;
		this.animated = data.animated || false;
	}

	public get identifier() {
		if (this.id) return `${this.name}:${this.id}`;
		return encodeURIComponent(this.name);
	}

	public get url() {
		return this.client.rest.cdn.Emoji(this.id as string, this.animated ? "gif" : "png");
	}

	public get createdTimestamp() {
		if (!this.id) return null;
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		if (!this.id) return null;
		return new Date(this.createdTimestamp as number);
	}

	public toJSON() {
		return {
			id: this.id,
			animated: this.animated,
			name: this.name
		};
	}

	public toString() {
		return this.id ? `<${this.animated ? "a" : ""}:${this.name}:${this.id}>` : this.name;
	}

	public _patch(data: import("@amanda/discordtypings").EmojiData) {
		if (data.id !== undefined) this.id = data.id;
		if (data.name) this.name = data.name;
		if (data.animated !== undefined) this.animated = !!data.animated;
	}
}

export = Emoji;

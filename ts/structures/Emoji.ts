import SnowflakeUtil from "../util/SnowflakeUtil";

import Base from "./Base";

class Emoji extends Base {
	public animated = false;
	public name!: string;
	public Id: string;
	public deleted = false;

	public constructor(client: import("../client/Client"), data: import("discord-typings").EmojiData) {
		super(client);

		this.Id = data.id || "";
		this.name = data.name;
		this.animated = data.animated || false;
	}

	public get identifier() {
		if (this.Id) return `${this.name}:${this.Id}`;
		return encodeURIComponent(this.name);
	}

	public get url() {
		return this.client.rest.cdn.Emoji(this.Id as string, this.animated ? "gif" : "png");
	}

	public get createdTimestamp() {
		if (!this.Id) return null;
		return SnowflakeUtil.deconstruct(this.Id).timestamp;
	}

	public get createdAt() {
		if (!this.Id) return null;
		return new Date(this.createdTimestamp as number);
	}

	public toJSON() {
		return {
			id: this.Id,
			animated: this.animated,
			name: this.name
		};
	}

	public toString() {
		return this.Id ? `<${this.animated ? "a" : ""}:${this.name}:${this.Id}>` : this.name;
	}

	public _patch(data: import("discord-typings").EmojiData) {
		if (data.id !== undefined) this.Id = data.id || "";
		if (data.name) this.name = data.name;
		if (data.animated !== undefined) this.animated = !!data.animated;
	}
}

export = Emoji;

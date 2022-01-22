// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import SnowflakeUtil from "../util/SnowflakeUtil";

import Base from "./Base";

// @ts-ignore
class Emoji extends Base {
	public animated = false;
	public name!: string;
	public id: string;
	public deleted = false;

	public static readonly default = Emoji;

	public constructor(client: import("../client/Client"), data: import("discord-typings").EmojiData) {
		super(client);

		this.id = data.id || "";
		this.name = data.name || "";
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

	public _patch(data: import("discord-typings").EmojiData) {
		if (data.id !== undefined) this.id = data.id || "";
		if (data.name) this.name = data.name;
		if (data.animated !== undefined) this.animated = !!data.animated;
	}
}

export = Emoji;

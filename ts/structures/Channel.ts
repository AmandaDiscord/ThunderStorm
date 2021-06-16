import Base from "./Base";
import { ChannelTypes } from "../util/Constants";

import SnowflakeUtil from "../util/SnowflakeUtil";

class Channel extends Base {
	public partial: false = false;
	public id!: string;
	public name!: string;
	public type: "category" | "dm" | "news" | "text" | "voice" | "stage" | "store" | "unknown" = "unknown";

	public constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").ChannelData) {
		super(client);

		if (data) setImmediate(() => this._patch(data));
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public fetch() {
		return Promise.resolve(this);
	}

	public toString() {
		return `<#${this.id}>`;
	}

	public toJSON() {
		return {
			id: this.id,
			name: this.id,
			type: ChannelTypes[this.type as import("../Types").ChannelType] || 0 as const
		};
	}

	public _patch(data: import("@amanda/discordtypings").ChannelData) {
		if (data.id) this.id = data.id;
		if (data.name) this.name = data.name;
	}
}

export = Channel;

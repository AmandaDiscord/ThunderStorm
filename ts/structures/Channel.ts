import Base from "./Base";
import { ChannelTypes } from "../util/Constants";

import SnowflakeUtil from "../util/SnowflakeUtil";

class Channel extends Base {
	public partial: false = false;
	public Id!: string;
	public name!: string;
	public type: import("../Types").ChannelType = "UNKNOWN";

	public constructor(client: import("../client/Client"), data: import("discord-typings").ChannelData) {
		super(client);

		this.Id = data.id;
		this.name = data.name;
		if (data) this._patch(data);
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.Id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public fetch() {
		return Promise.resolve(this);
	}

	public toString() {
		return `<#${this.Id}>`;
	}

	public toJSON() {
		return {
			id: this.Id,
			name: this.Id,
			type: ChannelTypes[this.type] || 0 as const
		};
	}

	public _patch(data: import("discord-typings").ChannelData) {
		if (data.id) this.Id = data.id;
		if (data.name) this.name = data.name;
	}
}

export = Channel;

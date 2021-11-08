import Base from "./Base";
import { ChannelTypes } from "../util/Constants";

import SnowflakeUtil from "../util/SnowflakeUtil";

class Channel extends Base {
	public partial: false = false;
	public id!: string;
	public name!: string;
	public type: import("../Types").ChannelType = "UNKNOWN";

	public constructor(client: import("../client/Client"), data: import("discord-typings").ChannelData) {
		super(client);

		this.id = data.id;
		this.name = data.name;
		if (data) this._patch(data);
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
			name: this.name,
			type: ChannelTypes[this.type] || 0 as const
		};
	}

	public _patch(data: import("discord-typings").ChannelData) {
		if (data.id) this.id = data.id;
		if (data.name) this.name = data.name;
	}
}

export = Channel;

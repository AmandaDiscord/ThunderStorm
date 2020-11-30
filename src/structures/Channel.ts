import SnowflakeUtil from "./Util/SnowflakeUtil";

class Channel {
	public client: import("./Client");
	public partial: false;
	public id: string;
	public name: string;
	public type: string;

	public constructor(data: import("@amanda/discordtypings").ChannelData, client: import("./Client")) {
		this.client = client;
		this.partial = false;

		this.id = data.id;
		this.name = data.name;
		this.type = "unknown";
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
			name: this.id
		};
	}
}

export = Channel;

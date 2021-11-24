// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Base from "./Base";
import SnowflakeUtil from "../util/SnowflakeUtil";

// @ts-ignore
class BaseGuild extends Base {
	public name: string;
	public icon: string | null;
	public features: Array<import("../Types").Feature>;

	public static readonly default = BaseGuild;

	public constructor(client: import("../client/Client"), data: Partial<import("discord-typings").GuildData>) {
		super(client);

		this.id = data.id as string;

		this.name = data.name as string;

		this.icon = data.icon as string;

		this.features = data.features as Array<import("../Types").Feature>;
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public get nameAcronym() {
		return this.name
			.replace(/'s /g, " ")
			.replace(/\w+/g, e => e[0])
			.replace(/\s/g, "");
	}

	public get partnered() {
		return this.features.includes("PARTNERED");
	}

	public get verified() {
		return this.features.includes("VERIFIED");
	}

	public iconURL(options: import("../Types").ImageURLOptions & { dynamic?: boolean } = {}) {
		if (!this.icon) return null;
		return this.client.rest.cdn.Icon(this.id, this.icon, options.format, options.size, options.dynamic);
	}

	public async fetch() {
		const Guild: typeof import("./Guild") = require("./Guild");
		const data = await this.client._snow.guild.getGuild(this.id, { with_counts: true });
		return new Guild(this.client, data);
	}

	public toString() {
		return this.name;
	}
}

export = BaseGuild;

import SnowflakeUtil from "./Util/SnowflakeUtil";

class Role {
	public client: import("./Client");
	public name: string;
	public id: string;
	public color: number;
	public managed: boolean;
	public hoisted: boolean;
	public permissions: number;
	public position: number;
	public mentionable: boolean;
	public guild: import("./Partial//PartialGuild");
	public partial: false = false;

	public constructor(data: import("@amanda/discordtypings").RoleData & { guild_id: string; }, client: import("./Client")) {
		const PartialGuild = require("./Partial/PartialGuild"); // lazy load

		this.client = client;

		this.name = data.name;
		this.id = data.id;
		this.color = data.color;
		this.managed = data.managed;
		this.hoisted = data.hoist;
		this.permissions = data.permissions;
		this.position = data.position;
		this.mentionable = data.mentionable;

		this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, this.client) : null;
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
		return `<@&${this.id}>`;
	}

	public toJSON() {
		return {
			name: this.name,
			id: this.id,
			color: this.color,
			managed: this.managed,
			hoist: this.hoisted,
			permissions: this.permissions,
			position: this.position,
			mentionable: this.mentionable,
			guild_id: this.guild ? this.guild.id : undefined
		};
	}
}

export = Role;

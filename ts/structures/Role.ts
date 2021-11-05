import SnowflakeUtil from "../util/SnowflakeUtil";

class Role {
	public client: import("../client/Client");
	public name: string;
	public Id: string;
	public color: number;
	public managed: boolean;
	public hoisted: boolean;
	public permissions: string;
	public position: number;
	public mentionable: boolean;
	public guild: import("./Partial/PartialGuild");
	public partial: false = false;

	public constructor(client: import("../client/Client"), data: import("discord-typings").RoleData & { guild_id: string; }) {
		const PartialGuild: typeof import("./Partial/PartialGuild") = require("./Partial/PartialGuild"); // lazy load

		this.client = client;

		this.name = data.name;
		this.Id = data.id;
		this.color = data.color;
		this.managed = data.managed;
		this.hoisted = data.hoist;
		this.permissions = data.permissions;
		this.position = data.position;
		this.mentionable = data.mentionable;

		this.guild = new PartialGuild(this.client, { id: data.guild_id });
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
		return `<@&${this.Id}>`;
	}

	public toJSON() {
		return {
			name: this.name,
			id: this.Id,
			color: this.color,
			managed: this.managed,
			hoist: this.hoisted,
			permissions: this.permissions,
			position: this.position,
			mentionable: this.mentionable,
			guild_id: this.guild ? this.guild.Id : undefined
		};
	}
}

export = Role;

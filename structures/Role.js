class Role {
	/**
	 * @param {import("@amanda/discordtypings").RoleData & { guild_id: string }} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
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
	fetch() {
		return Promise.resolve(this);
	}
	toString() {
		return `<@&${this.id}>`
	}
	toJSON() {
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
		}
	}
}

module.exports = Role;

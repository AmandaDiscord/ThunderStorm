import Constants from "../Constants";

import Collection from "./Util/Collection";

class InteractionCommand {
	public id!: string;
	public name!: string;
	public message: import("./InteractionMessage");
	public users: Collection<string, import("./User")> = new Collection();
	public members: Collection<string, import("./GuildMember")> = new Collection();
	public channels: Collection<string, import("./Partial/PartialChannel")> = new Collection();
	public roles: Collection<string, import("./Role")> = new Collection();
	public options: Collection<string, import("./CommandOption")> = new Collection();

	public constructor(message: import("./InteractionMessage"), data: import("@amanda/discordtypings").ApplicationCommandInteractionData) {
		this.message = message;

		this._patch(data);
	}

	public toJSON() {
		return {
			id: this.id,
			name: this.name,
			options: [...this.options.values()].map(o => o.toJSON()),
			resolved: {
				users: [...this.users.values()].map(u => u.toJSON()),
				members: [...this.members.values()].map(m => m.toJSON()),
				roles: [...this.roles.values()].map(r => r.toJSON()),
				channels: [...this.channels.values()].map(c => c.toJSON())
			}
		};
	}

	public _patch(data: import("@amanda/discordtypings").ApplicationCommandInteractionData) {
		const CommandOption: typeof import("./CommandOption") = require("./CommandOption");

		const User: typeof import("./User") = require("./User");
		const GuildMember: typeof import("./GuildMember") = require("./GuildMember");
		const Role: typeof import("./Role") = require("./Role");
		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");

		if (data.id) this.id = data.id;
		if (data.name) this.name = data.name;
		if (data.options) {
			this.options.clear();
			for (const option of data.options) this.options.set(option.name, new CommandOption(this, option));
		}
		if (data.resolved) {
			if (data.resolved.users) {
				this.users.clear();
				for (const id of Object.keys(data.resolved.users)) this.users.set(id, new User(data.resolved.users[id], this.message.client));
			}

			if (data.resolved.members) {
				this.members.clear();
				for (const id of Object.keys(data.resolved.members)) this.members.set(id, new GuildMember(Object.assign({}, data.resolved.members[id], { user: data.resolved.users && data.resolved.users[id] ? data.resolved.users[id] : { id: id, avatar: null, username: "Deleted User", discriminator: "0000" } }, { guild_id: this.message.guild?.id }), this.message.client));
			}

			if (data.resolved.roles) {
				this.roles.clear();
				for (const id of Object.keys(data.resolved.roles)) this.roles.set(id, new Role(Object.assign({}, data.resolved.roles[id], { guild_id: this.message.guild?.id as string }), this.message.client));
			}

			if (data.resolved.channels) {
				this.channels.clear();
				for (const id of Object.keys(data.resolved.channels)) {
					const c = data.resolved.channels[id];
					// @ts-ignore
					this.channels.set(id, new PartialChannel({ id: c.id, name: c.name, type: Constants.CHANNEL_TYPES[c.type], permissions: c.permissions }, this.message.client));
				}
			}
		}
	}
}

export = InteractionCommand;

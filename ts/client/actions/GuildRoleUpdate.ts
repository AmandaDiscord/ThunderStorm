// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import { Events } from "../../util/Constants";

class GuildRoleUpdateAction extends Action {
	public static readonly default = GuildRoleUpdateAction;

	public handle(data: { guild_id: string; role: import("discord-typings").RoleData }) {
		const Role: typeof import("../../structures/Role") = require("../../structures/Role");
		const role = new Role(this.client, Object.assign({}, data.role, { guild_id: data.guild_id }));

		this.client.emit(Events.GUILD_ROLE_UPDATE, role);

		return {
			old: null,
			updated: role
		};
	}
}

export = GuildRoleUpdateAction;

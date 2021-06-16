import Action from "./Action";
import { Events } from "../../util/Constants";

class GuildRoleCreate extends Action {
	public handle(data: { guild_id: string; role: import("@amanda/discordtypings").RoleData }) {
		const Role: typeof import("../../structures/Role") = require("../../structures/Role");
		const role = new Role(this.client, Object.assign({}, data.role, { guild_id: data.guild_id }));
		this.client.emit(Events.GUILD_ROLE_CREATE, role);
		return { role };
	}
}

export = GuildRoleCreate;

import Action from "./Action";
import { Events } from "../../util/Constants";

class GuildRoleDeleteAction extends Action {
	public handle(data: { guild_id: string; role_id: string }) {
		const PartialRole: typeof import("../../structures/Partial/PartialRole") = require("../../structures/Partial/PartialRole");
		const role = new PartialRole(this.client, { id: data.role_id, guild_id: data.guild_id });
		this.client.emit(Events.GUILD_ROLE_DELETE, role);
		return { role };
	}
}

export = GuildRoleDeleteAction;

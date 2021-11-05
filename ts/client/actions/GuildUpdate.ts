import Action from "./Action";
import { Events } from "../../util/Constants";

class GuildUpdateAction extends Action {
	public handle(data: import("discord-typings").GuildData) {
		const Guild: typeof import("../../structures/Guild") = require("../../structures/Guild");
		const guild = new Guild(this.client, data);
		this.client.emit(Events.GUILD_UPDATE, guild);

		return {
			old: null,
			updated: guild
		};
	}
}

export = GuildUpdateAction;

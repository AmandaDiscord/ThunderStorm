import Action from "./Action";
import { Events } from "../../util/Constants";

class GuildDeleteAction extends Action {
	public deleted: Map<any, any>;

	public constructor(client: import("../Client")) {
		super(client);
		this.deleted = new Map();
	}

	public handle(data: import("discord-typings").GuildDeleteData) {
		const PartialGuild: typeof import("../../structures/Partial/PartialGuild") = require("../../structures/Partial/PartialGuild");
		const guild = new PartialGuild(this.client, data);
		if (data.unavailable) {
			this.client.emit(Events.GUILD_UNAVAILABLE, guild);
			return { guild: null };
		}
		this.client.emit(Events.GUILD_DELETE, guild);

		return { guild };
	}

	public scheduleForDeletion(id: string) {
		void 0;
	}
}

export = GuildDeleteAction;

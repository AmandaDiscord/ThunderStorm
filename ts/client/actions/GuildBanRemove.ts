// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import { Events } from "../../util/Constants";

class GuildBanRemove extends Action {
	public static readonly default = GuildBanRemove;

	handle(data: import("discord-typings").GuildBanRemoveData) {
		const GuildBan: typeof import("../../structures/GuildBan") = require("../../structures/GuildBan");
		const PartialGuild: typeof import("../../structures/Partial/PartialGuild") = require("../../structures/Partial/PartialGuild");

		this.client.emit(Events.GUILD_BAN_REMOVE, new GuildBan(this.client, data, new PartialGuild(this.client, { id: data.guild_id })));
	}
}

export = GuildBanRemove;

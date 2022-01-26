// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import { Events } from "../../util/Constants";

class GuildIntegrationsUpdate extends Action {
	public static readonly default = GuildIntegrationsUpdate;

	public handle(data: { guild_id: string }) {
		const PartialGuild: typeof import("../../structures/Partial/PartialGuild") = require("../../structures/Partial/PartialGuild");
		const guild = new PartialGuild(this.client, { id: data.guild_id });
		this.client.emit(Events.GUILD_INTEGRATIONS_UPDATE, guild);
	}
}

export = GuildIntegrationsUpdate;

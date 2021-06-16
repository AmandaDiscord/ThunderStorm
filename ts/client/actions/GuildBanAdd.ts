import Action from "./Action";
import { Events } from "../../util/Constants";

class GuildBanAdd extends Action {
	public handle(data: import("@amanda/discordtypings").GuildBanAddData) {
		const GuildBan: typeof import("../../structures/GuildBan") = require("../../structures/GuildBan");
		const PartialGuild: typeof import("../../structures/Partial/PartialGuild") = require("../../structures/Partial/PartialGuild");

		this.client.emit(Events.GUILD_BAN_ADD, new GuildBan(this.client, data, new PartialGuild(this.client, { id: data.guild_id })));
	}
}

export = GuildBanAdd;

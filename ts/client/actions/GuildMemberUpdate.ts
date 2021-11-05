import Action from "./Action";
import { Events } from "../../util/Constants";

class GuildMemberUpdateAction extends Action {
	public handle(data: import("discord-typings").MemberData & { guild_id: string; user: import("discord-typings").UserData }) {
		const GuildMember: typeof import("../../structures/GuildMember") = require("../../structures/GuildMember");
		const member = new GuildMember(this.client, data);
		this.client.emit(Events.GUILD_MEMBER_UPDATE, member);
	}
}

export = GuildMemberUpdateAction;

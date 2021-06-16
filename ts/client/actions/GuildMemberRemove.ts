import Action from "./Action";
import { Events } from "../../util/Constants";

class GuildMemberRemoveAction extends Action {
	public handle(data: import("@amanda/discordtypings").GuildMemberRemoveData) {
		const GuildMember: typeof import("../../structures/GuildMember") = require("../../structures/GuildMember");
		const member = new GuildMember(this.client, { user: data.user, guild_id: data.guild_id, deaf: false, hoisted_role: data.guild_id, joined_at: new Date().toISOString(), mute: false, nick: null, roles: [] });
		this.client.emit(Events.GUILD_MEMBER_REMOVE, member);
		return { guild: member.guild, member };
	}
}

export = GuildMemberRemoveAction;
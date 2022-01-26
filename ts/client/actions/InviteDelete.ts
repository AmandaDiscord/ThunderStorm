// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import { Events } from "../../util/Constants";

class InviteDeleteAction extends Action {
	public static readonly default = InviteDeleteAction;

	public handle(data: import("discord-typings").InviteDeleteData) {
		const Invite: typeof import("../../structures/Invite") = require("../../structures/Invite");
		const invite = new Invite(this.client, data as any);
		this.client.emit(Events.INVITE_DELETE, invite);
		return { invite };
	}
}

export = InviteDeleteAction;

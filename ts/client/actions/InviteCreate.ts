// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import { Events } from "../../util/Constants";

class InviteCreateAction extends Action {
	public static readonly default = InviteCreateAction;

	public handle(data: import("discord-typings").InviteCreateData) {
		const Invite: typeof import("../../structures/Invite") = require("../../structures/Invite");
		const invite = new Invite(this.client, data as any);
		this.client.emit(Events.INVITE_CREATE, invite);
		return { invite };
	}
}

export = InviteCreateAction;

import Action from "./Action";
import { Events } from "../../util/Constants";

class InviteCreateAction extends Action {
	public handle(data: import("@amanda/discordtypings").InviteCreateData) {
		const Invite: typeof import("../../structures/Invite") = require("../../structures/Invite");
		const invite = new Invite(this.client, data as any);
		this.client.emit(Events.INVITE_CREATE, invite);
		return { invite };
	}
}

export = InviteCreateAction;

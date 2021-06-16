import Action from "./Action";
import { Events } from "../../util/Constants";

class PresenceUpdateAction extends Action {
	public handle(data: import("@amanda/discordtypings").PresenceUpdateData) {
		const Presence: typeof import("../../structures/Presence").Presence = require("../../structures/Presence").Presence;
		// @ts-ignore
		const presence = new Presence(this.client, data);

		this.client.emit(Events.PRESENCE_UPDATE, presence);
	}
}

export = PresenceUpdateAction;

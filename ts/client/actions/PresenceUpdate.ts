import Action from "./Action";
import { Events } from "../../util/Constants";

class PresenceUpdateAction extends Action {
	public handle(data: import("discord-typings").PresenceUpdateData) {
		const Presence: typeof import("../../structures/Presence").Presence = require("../../structures/Presence").Presence;
		const presence = new Presence(this.client, data as unknown as import("discord-typings").PresenceData);

		this.client.emit(Events.PRESENCE_UPDATE, presence);
	}
}

export = PresenceUpdateAction;

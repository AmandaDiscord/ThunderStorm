import Action from "./Action";
import { Events } from "../../util/Constants";

class MessageUpdateAction extends Action {
	public handle(data: import("@amanda/discordtypings").MessageData) {
		const Message: typeof import("../../structures/Message") = require("../../structures/Message");
		const PartialChannel: typeof import("../../structures/Partial/PartialChannel") = require("../../structures/Partial/PartialChannel");
		const channel = new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id });
		const message = new Message(this.client, data, channel);

		this.client.emit(Events.MESSAGE_UPDATE, message);

		return {
			old: null,
			updated: message
		};
	}
}

export = MessageUpdateAction;

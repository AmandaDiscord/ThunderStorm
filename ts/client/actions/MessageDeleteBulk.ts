import Action from "./Action";
import Collection from "../../util/Collection";
import { Events } from "../../util/Constants";

class MessageDeleteBulkAction extends Action {
	public handle(data: import("@amanda/discordtypings").MessageBulkDeleteData) {
		const PartialChannel: typeof import("../../structures/Partial/PartialChannel") = require("../../structures/Partial/PartialChannel");
		const PartialMessage: typeof import("../../structures/Partial/PartialMessage") = require("../../structures/Partial/PartialMessage");
		const msgs = [];
		const channel = new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id });
		for (const id of data.ids) {
			const message = new PartialMessage(this.client, { id: id, channel_id: data.channel_id });
			message.channel = channel;
			if (channel.guild) message.guild = channel.guild;
			msgs.push(message);
		}

		const messages = new Collection(msgs.map(msg => [msg.id, msg]));
		this.client.emit(Events.MESSAGE_BULK_DELETE, messages);
		return { messages };
	}
}

export = MessageDeleteBulkAction;

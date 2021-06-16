import Action from "./Action";
import { Events } from "../../util/Constants";

class MessageCreateAction extends Action {
	handle(data: import("@amanda/discordtypings").MessageData) {
		const Message: typeof import("../../structures/Message") = require("../../structures/Message");
		const PartialChannel: typeof import("../../structures/Partial/PartialChannel") = require("../../structures/Partial/PartialChannel");
		const PartialMessage: typeof import("../../structures/Partial/PartialMessage") = require("../../structures/Partial/PartialMessage");
		const channel = new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id });
		const message = new Message(this.client, data, channel);
		const msg = new PartialMessage(this.client, { id: data.id, channel_id: data.channel_id });
		msg.channel = channel;
		msg.guild = message.guild;

		message.channel.lastMessageID = data.id;

		if (message.author) {
			message.author.lastMessageID = data.id;
			message.author.lastMessageChannelID = data.channel_id;
			message.author.lastMessage = msg;
		}
		if (message.member) {
			message.member.lastMessageID = data.id;
			message.member.lastMessageChannelID = data.channel_id;
			message.member.lastMessage = msg;
		}

		this.client.emit(Events.MESSAGE_CREATE, message);
		return { message };
	}
}

export = MessageCreateAction;

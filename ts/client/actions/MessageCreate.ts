// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import { Events, ChannelTypes } from "../../util/Constants";

class MessageCreateAction extends Action {
	public static readonly default = MessageCreateAction;

	handle(data: import("discord-typings").MessageData) {
		const Message: typeof import("../../structures/Message") = require("../../structures/Message");
		const PartialChannel: typeof import("../../structures/Partial/PartialChannel") = require("../../structures/Partial/PartialChannel");
		const PartialMessage: typeof import("../../structures/Partial/PartialMessage") = require("../../structures/Partial/PartialMessage");
		const channel = new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id, type: data.guild_id ? ChannelTypes[0] : ChannelTypes[1] });
		const message = new Message(this.client, data, channel);
		const msg = new PartialMessage(this.client, { id: data.id, channel_id: data.channel_id });
		msg.channel = channel;
		msg.guild = message.guild;

		message.channel.lastMessageId = data.id;

		if (message.author) {
			message.author.lastMessageId = data.id;
			message.author.lastMessageChannelId = data.channel_id;
			message.author.lastMessage = msg;
		}
		if (message.member) {
			message.member.lastMessageId = data.id;
			message.member.lastMessageChannelId = data.channel_id;
			message.member.lastMessage = msg;
		}

		this.client.emit(Events.MESSAGE_CREATE, message);
		return { message };
	}
}

export = MessageCreateAction;

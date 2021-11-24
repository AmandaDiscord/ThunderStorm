// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import { Events } from "../../util/Constants";

class MessageReactionRemoveAll extends Action {
	public static readonly default = MessageReactionRemoveAll;

	public handle(data: import("discord-typings").MessageReactionRemoveAllData) {
		const PartialMessage: typeof import("../../structures/Partial/PartialMessage") = require("../../structures/Partial/PartialMessage");
		const message = new PartialMessage(this.client, { id: data.message_id, channel_id: data.channel_id, guild_id: data.guild_id });

		this.client.emit(Events.MESSAGE_REACTION_REMOVE_ALL, message);

		return { message };
	}
}

export = MessageReactionRemoveAll;

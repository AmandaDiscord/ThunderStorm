// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import { Events } from "../../util/Constants";

class MessageReactionRemove extends Action {
	public static readonly default = MessageReactionRemove;

	public handle(data: import("discord-typings").MessageReactionRemoveData) {
		const PartialMessage: typeof import("../../structures/Partial/PartialMessage") = require("../../structures/Partial/PartialMessage");
		const PartialUser: typeof import("../../structures/Partial/PartialUser") = require("../../structures/Partial/PartialUser");
		const MessageReaction: typeof import("../../structures/MessageReaction") = require("../../structures/MessageReaction");
		if (!data.emoji) return false;

		const reaction = new MessageReaction(new PartialMessage(this.client, { id: data.message_id, channel_id: data.channel_id, guild_id: data.guild_id }), data.emoji, 1, data.user_id === this.client.user?.id);
		const user = new PartialUser(this.client, { id: data.user_id });

		this.client.emit(Events.MESSAGE_REACTION_REMOVE, reaction, user);

		return { message: reaction.message, reaction, user };
	}
}

export = MessageReactionRemove;

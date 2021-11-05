import Action from "./Action";
import { Events } from "../../util/Constants";

class MessageReactionRemoveEmoji extends Action {
	public handle(data: import("discord-typings").MessageReactionRemoveEmojiData) {
		const PartialMessage: typeof import("../../structures/Partial/PartialMessage") = require("../../structures/Partial/PartialMessage");
		const MessageReaction: typeof import("../../structures/MessageReaction") = require("../../structures/MessageReaction");
		const reaction = new MessageReaction(new PartialMessage(this.client, { id: data.message_id, channel_id: data.channel_id, guild_id: data.guild_id }), data.emoji, 0, false);

		this.client.emit(Events.MESSAGE_REACTION_REMOVE_EMOJI, reaction);
		return { reaction };
	}
}

export = MessageReactionRemoveEmoji;

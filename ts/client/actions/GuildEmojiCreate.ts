// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import { Events } from "../../util/Constants";

class GuildEmojiCreateAction extends Action {
	public static readonly default = GuildEmojiCreateAction;

	public handle(guild: import("../../structures/Partial/PartialGuild"), createdEmoji: import("../../structures/Emoji")) {
		this.client.emit(Events.GUILD_EMOJI_CREATE, createdEmoji);
		return { emoji: createdEmoji };
	}
}

export = GuildEmojiCreateAction;

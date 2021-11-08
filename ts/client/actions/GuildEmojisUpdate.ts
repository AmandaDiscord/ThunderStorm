import Action from "./Action";
import Collection from "../../util/Collection";
import { Events } from "../../util/Constants";

class GuildEmojisUpdateAction extends Action {
	public handle(data: import("discord-typings").GuildEmojisUpdateData) {
		const PartialGuild: typeof import("../../structures/Partial/PartialGuild") = require("../../structures/Partial/PartialGuild");
		const Emoji: typeof import("../../structures/Emoji") = require("../../structures/Emoji");

		const guild = new PartialGuild(this.client, { id: data.guild_id });
		const emojis = data.emojis.map(e => new Emoji(this.client, e));

		for (const emoji of emojis) {
			// VERY HUGE ASSUMPTION. Manually adding emojis one by one should take longer than 1 second unless user was a pro speed runner.
			// Multiple added at the same time should be included in the same GUILD_EMOJIS_UPDATE event.
			if (emoji.createdTimestamp && emoji.createdTimestamp > Date.now() - 1000) this.client.actions.GuildEmojiCreate.handle(guild, emoji);
		}

		this.client.emit(Events.GUILD_EMOJIS_UPDATE, guild, new Collection(emojis.map(e => [e.id as string, e])));
	}
}

export = GuildEmojisUpdateAction;

import Action from "./Action";
import { Events } from "../../util/Constants";

class TypingStart extends Action {
	public handle(data: import("@amanda/discordtypings").TypingStartData) {
		const PartialChannel: typeof import("../../structures/Partial/PartialChannel") = require("../../structures/Partial/PartialChannel");
		const PartialUser: typeof import("../../structures/Partial/PartialUser") = require("../../structures/Partial/PartialUser");

		this.client.emit(Events.TYPING_START, new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id }), new PartialUser(this.client, { id: data.user_id }));
	}

	tooLate(channel: any, user: any) {
		void 0;
	}
}

export = TypingStart;

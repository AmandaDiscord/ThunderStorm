// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import { Events } from "../../util/Constants";

import PartialGuild from "../../structures/Partial/PartialGuild";
import ThreadTextChannel from "../../structures/ThreadTextChannel";
import ThreadNewsChannel from "../../structures/ThreadNewsChannel";

class ThreadDeleteAction extends Action {
	public static readonly default = ThreadDeleteAction;

	public handle(data: import("discord-typings").ThreadChannelData) {
		const guild = new PartialGuild(this.client, { id: data.guild_id });
		const thread = data.type === 10 ? new ThreadNewsChannel(guild, data) : new ThreadTextChannel(guild, data);
		this.client.emit(Events.THREAD_DELETE, thread);
		return { thread };
	}
}

export = ThreadDeleteAction;

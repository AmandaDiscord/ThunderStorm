// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import { Collection } from "@discordjs/collection";
import Action from "./Action";
import { Events } from "../../util/Constants";

import PartialGuild from "../../structures/Partial/PartialGuild";
import ThreadTextChannel from "../../structures/ThreadTextChannel";
import ThreadNewsChannel from "../../structures/ThreadNewsChannel";
import ThreadMember from "../../structures/ThreadMember";

class ThreadListSyncAction extends Action {
	public static readonly default = ThreadListSyncAction;

	public handle(data: import("discord-typings").ThreadListSyncData) {
		const guild = new PartialGuild(this.client, { id: data.guild_id });
		const syncedThreads = data.threads.reduce((coll, rawThread) => {
			const thread = rawThread.type === 10 ? new ThreadNewsChannel(guild, rawThread) : new ThreadTextChannel(guild, rawThread);
			return coll.set(thread.id, thread);
		}, new Collection<string, import("../../structures/ThreadNewsChannel") | import("../../structures/ThreadTextChannel")>());

		for (const rawMember of Object.values(data.members)) {
			// Discord sends the thread id as id in this object
			const thread = syncedThreads.get(rawMember.id as string);
			if (thread) {
				thread.members.set(rawMember.user_id as string, new ThreadMember(thread, rawMember));
			}
		}

		this.client.emit(Events.THREAD_LIST_SYNC, syncedThreads);

		return { syncedThreads };
	}

	removeStale(channel: any) {
		void 0;
	}
}

export = ThreadListSyncAction;

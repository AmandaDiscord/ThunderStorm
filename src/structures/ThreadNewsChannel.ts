import Collection from "./Util/Collection";

import NewsChannel from "./NewsChannel";
import ThreadMetaData from "./ThreadMetadata";
import ThreadMember from "./ThreadMember";

class ThreadNewsChannel extends NewsChannel {
	// @ts-ignore
	public type: "news-thread" = "news-thread";
	public ownerID!: string;
	public owner!: import("./Partial/PartialUser");
	public memberCount = 0;
	public messageCount = 0;
	public meta!: import("./ThreadMetadata");
	public members: Collection<string, ThreadMember> = new Collection();
	public parent!: import("./Partial/PartialChannel");
	public guild!: import("./Partial/PartialGuild");

	public constructor(data: import("@amanda/discordtypings").ThreadChannelData, client: import("./Client")) {
		// @ts-ignore
		super(data, client);

		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");
		const PartialGuild: typeof import("./Partial/PartialGuild") = require("./Partial/PartialGuild");
		const PartialUser: typeof import("./Partial/PartialUser") = require("./Partial/PartialUser");
		if (data.owner_id) {
			this.ownerID = data.owner_id;
			this.owner = new PartialUser({ id: this.ownerID }, this.client);
		}
		if (data.member_count !== undefined) this.memberCount = data.member_count;
		if (data.message_count !== undefined) this.messageCount = data.message_count;
		if (!this.meta || data.thread_metadata) this.meta = new ThreadMetaData(this, data.thread_metadata);
		if (data.parent_id) this.parent = new PartialChannel({ id: data.parent_id, guild_id: data.guild_id }, this.client);
		if (data.guild_id) this.guild = new PartialGuild({ id: data.guild_id }, this.client);
	}

	public async fetchMembers() {
		const ms = await this.client._snow.channel.getChannelThreadMembers(this.id);
		if (!ms) return null;
		const members = ms.map(m => new ThreadMember(this, m));
		this.members.clear();
		for (const member of members) this.members.set(member.id, member);
		return members;
	}

	// @ts-ignore
	public toJSON(): import("@amanda/discordtypings").ThreadChannelData {
		// @ts-ignore
		return Object.assign(super.toJSON(), {
			type: 10,
			owner_id: this.ownerID,
			member_count: this.memberCount,
			message_count: this.messageCount,
			thread_metadata: this.meta.toJSON(),
			parent_id: this.parent.id,
			guild_id: this.guild.id
		});
	}

	// @ts-ignore
	public _patch(data: import("@amanda/discordtypings").ThreadChannelData) {
		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");
		const PartialGuild: typeof import("./Partial/PartialGuild") = require("./Partial/PartialGuild");
		const PartialUser: typeof import("./Partial/PartialUser") = require("./Partial/PartialUser");
		if (data.owner_id) {
			this.ownerID = data.owner_id;
			this.owner = new PartialUser({ id: this.ownerID }, this.client);
		}
		if (data.member_count !== undefined) this.memberCount = data.member_count;
		if (data.message_count !== undefined) this.messageCount = data.message_count;
		if (!this.meta || data.thread_metadata) this.meta = new ThreadMetaData(this, data.thread_metadata);
		if (data.parent_id) this.parent = new PartialChannel({ id: data.parent_id, guild_id: data.guild_id }, this.client);
		if (data.guild_id) this.guild = new PartialGuild({ id: data.guild_id }, this.client);
		// @ts-ignore
		super._patch(data);
	}
}

export = ThreadNewsChannel;

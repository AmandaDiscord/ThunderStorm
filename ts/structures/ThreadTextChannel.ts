import Collection from "../util/Collection";

import TextChannel from "./TextChannel";
import ThreadMetaData from "./ThreadMetadata";
import ThreadMember from "./ThreadMember";

import Constants from "../util/Constants";

class ThreadTextChannel extends TextChannel {
	// @ts-ignore
	public type: typeof Constants.ChannelTypes[11] | typeof Constants.ChannelTypes[12] = Constants.ChannelTypes[11];
	public private = false;
	public ownerId!: string;
	public owner!: import("./Partial/PartialUser");
	public memberCount = 0;
	public messageCount = 0;
	public meta!: import("./ThreadMetadata");
	public members: Collection<string, ThreadMember> = new Collection();
	public parent!: import("./Partial/PartialChannel");
	public guild!: import("./Partial/PartialGuild");

	public constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").ThreadChannelData) {
		super(guild, data as unknown as import("discord-typings").TextChannelData);
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
	public toJSON(): import("discord-typings").ThreadChannelData {
		return Object.assign(super.toJSON(), {
			type: this.private ? 12 : 11 as 11 | 12,
			owner_id: this.ownerId,
			member_count: this.memberCount,
			message_count: this.messageCount,
			thread_metadata: this.meta.toJSON(),
			parent_id: this.parent.id,
			guild_id: this.guild.id
		});
	}

	// @ts-ignore
	public _patch(data: import("discord-typings").ThreadChannelData) {
		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");
		const PartialUser: typeof import("./Partial/PartialUser") = require("./Partial/PartialUser");
		super._patch(data as unknown as import("discord-typings").TextChannelData);
		if (data.owner_id) {
			this.ownerId = data.owner_id;
			this.owner = new PartialUser(this.client, { id: this.ownerId });
		}
		if (data.member_count !== undefined) this.memberCount = data.member_count;
		if (data.message_count !== undefined) this.messageCount = data.message_count;
		if (!this.meta || data.thread_metadata) this.meta = new ThreadMetaData(this, data.thread_metadata);
		if (data.type) this.private = data.type === 12 ? true : false;
		if (data.parent_id) this.parent = new PartialChannel(this.client, { id: data.parent_id, guild_id: data.guild_id, type: Constants.ChannelTypes[0] });
	}
}

export = ThreadTextChannel;

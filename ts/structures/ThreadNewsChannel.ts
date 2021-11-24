// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import { Collection } from "@discordjs/collection";

import NewsChannel from "./NewsChannel";
import ThreadMetaData from "./ThreadMetadata";
import ThreadMember from "./ThreadMember";

import Constants from "../util/Constants";

class ThreadNewsChannel extends NewsChannel {
	// @ts-ignore
	public type: typeof Constants.ChannelTypes[10];
	public ownerId!: string;
	public owner!: import("./Partial/PartialUser");
	public memberCount = 0;
	public messageCount = 0;
	public meta!: import("./ThreadMetadata");
	public members = new Collection<string, ThreadMember>();
	public parent!: import("./Partial/PartialChannel");
	public defaultAutoArchiveDuration = 0;

	public static readonly default = ThreadNewsChannel;

	public constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").ThreadChannelData) {
		super(guild, data as unknown as import("discord-typings").NewsChannelData);
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
			type: 10,
			owner_id: this.ownerId,
			member_count: this.memberCount,
			message_count: this.messageCount,
			thread_metadata: this.meta.toJSON(),
			parent_id: this.parent.id,
			guild_id: this.guild.id,
			default_auto_archive_duration: this.defaultAutoArchiveDuration
		}) as unknown as import("discord-typings").ThreadChannelData;
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
		if (data.parent_id) this.parent = new PartialChannel(this.client, { id: data.parent_id, guild_id: data.guild_id, type: Constants.ChannelTypes[10] });
	}
}

export = ThreadNewsChannel;

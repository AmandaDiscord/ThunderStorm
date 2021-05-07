import Constants from "../Constants";

import Collection from "./Util/Collection";
import Util from "./Util/Util";

import Base from "./Base";
import ClientApplication from "./ClientApplication";
import User from "./User";
import GuildMember from "./GuildMember";
import MessageAttachment from "./MessageAttachment";
import MessageFlags from "./MessageFlags";
import MessageMentions from "./MessageMentions";
import MessageReaction from "./MessageReaction";
import ThreadTextChannel from "./ThreadTextChannel";

class Message extends Base {
	public id!: string;
	public channel!: import("./Partial/PartialChannel");
	public guild: import("./Partial/PartialGuild") | null = null;
	public author!: import("./User");
	public member: GuildMember | null = null;
	public attachments: Collection<string, import("./MessageAttachment")> = new Collection();
	public application: ClientApplication | null = null;
	public activity: { partyID?: string; type?: number } | null = null;
	public content = "";
	public editedAt: Date | null = null;
	public editedTimestamp: number | null = null;
	public embeds: Array<import("./MessageEmbed")> = [];
	public flags!: Readonly<MessageFlags>;
	public mentions!: MessageMentions;
	public reactions: Collection<string, MessageReaction> = new Collection();
	public thread: ThreadTextChannel | null = null;
	public nonce: string | null = null;
	public pinned = false;
	public tts = false;
	public type = 0;
	public system!: boolean;
	public webhookID: string | null = null;

	public constructor(data: import("@amanda/discordtypings").MessageData, client: import("./Client")) {
		super(data, client);
		this._patch(data);
	}

	public get cleanContent() {
		return Util.cleanContent(this.content, this);
	}

	public async edit(content: import("../Types").StringResolvable, options: import("../Types").MessageOptions = {}) {
		const TextBasedChannel: typeof import("./Interfaces/TextBasedChannel") = require("./Interfaces/TextBasedChannel");
		const data = TextBasedChannel.transform(content, options, true);
		const msg = await this.client._snow.channel.editMessage(this.channel.id, this.id, data, { disableEveryone: options.disableEveryone || this.client._snow.options.disableEveryone || false });
		if (this.guild) msg.guild_id = this.guild.id;
		return this._patch(msg);
	}

	/**
	 * @param timeout timeout in ms to delete the Message.
	 */
	public async delete(timeout = 0): Promise<this> {
		const TextBasedChannel = require("./Interfaces/TextBasedChannel");
		await TextBasedChannel.deleteMessage(this.client, this.channel.id, this.id, timeout);
		return this;
	}

	public async react(emoji: string) {
		if (emoji.match(/^\d+$/)) throw new TypeError("The reaction provided must be in name:id format");
		const ceregex = /<?a?:?(\w+):(\d+)>?/;
		let value;
		const match = emoji.match(ceregex);
		if (match) value = `${match[1]}:${match[2]}`;
		else value = emoji;
		await this.client._snow.channel.createReaction(this.channel.id, this.id, encodeURIComponent(value));
		return this;
	}

	public async clearReactions() {
		await this.client._snow.channel.deleteAllReactions(this.channel.id, this.id);
		return this;
	}

	public toJSON() {
		const mentions = this.mentions.toJSON();
		const value = {
			id: this.id,
			channel_id: this.channel.id,
			guild_id: this.guild?.id || null,
			author: this.author.toJSON(),
			member: this.member?.toJSON() || null,
			attachments: this.attachments,
			application: this.application?.toJSON() || null,
			content: this.content,
			edited_timestamp: this.editedAt?.toISOString() || null,
			embeds: this.embeds.map(i => i.toJSON()),
			flags: Number(this.flags.bitfield),
			timestamp: this.createdAt.toISOString(),
			mentions: mentions.mentions,
			mention_roles: mentions.mention_roles,
			mention_everyone: mentions.mention_everyone,
			mention_channels: mentions.mention_channels,
			nonce: this.nonce,
			pinned: this.pinned,
			tts: this.tts,
			type: this.type,
			system: this.system,
			webhook_id: this.webhookID,
			thread: this.thread ? this.thread.toJSON() : null
		};
		if (this.activity) {
			const activity: { party_id?: string; type?: number } = {};
			if (this.activity.partyID) activity["party_id"] = this.activity.partyID;
			if (this.activity.type) activity["type"] = this.activity.type;
			Object.assign(value, activity);
		}
		return value as typeof value & { activity?: { party_id?: string, type?: number } };
	}

	public toString() {
		return this.content;
	}

	public _patch(data: import("@amanda/discordtypings").MessageData) {
		const MessageEmbed: typeof import("./MessageEmbed") = require("./MessageEmbed");
		const PartalGuild: typeof import("./Partial/PartialGuild") = require("./Partial/PartialGuild");
		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel"); // lazy load

		if (data.id) this.id = data.id;
		if (data.channel_id) this.channel = new PartialChannel({ id: data.channel_id, guild_id: data.guild_id, type: data.guild_id ? "text" : "dm" }, this.client);
		if (data.guild_id) this.guild = new PartalGuild({ id: data.guild_id }, this.client);
		if (data.author) this.author = data.author ? data.author.id === this.client.user?.id ? this.client.user : new User(data.author, this.client) : new User({ username: "Discord", discriminator: "0000", id: Constants.SYSTEM_USER_ID, avatar: "d9fa72d57744dea056b12e2b34a87173" }, this.client);
		if (data.member && data.author) this.member = new GuildMember({ user: data.author, ...data.member }, this.client);
		if (data.attachments && Array.isArray(data.attachments)) for (const attachment of data.attachments) this.attachments.set(attachment.id, new MessageAttachment(attachment.url, attachment.filename, attachment));
		if (!this.application || data.application) this.application = data.application ? new ClientApplication(data.application, this.client) : null;
		if (!this.activity || data.activity) this.activity = data.activity ? { partyID: data.activity.party_id, type: data.activity.type } : null;
		if (data.content !== undefined) this.content = data.content || "";
		if (data.edited_timestamp) {
			this.editedAt = new Date(data.edited_timestamp);
			this.editedTimestamp = this.editedAt ? this.editedAt.getTime() : null;
		}
		if (data.embeds) this.embeds = data.embeds && Array.isArray(data.embeds) ? data.embeds.map(embed => new MessageEmbed(embed, true)) : [];
		if (!this.flags || data.flags !== undefined) this.flags = new MessageFlags(data.flags || 0).freeze();
		if (!this.mentions || data.mentions || data.mention_channels || data.mention_everyone !== undefined || data.mention_roles) this.mentions = new MessageMentions(this, data.mentions, data.mention_roles, data.mention_everyone, data.mention_channels);
		if (data.reactions && Array.isArray(data.reactions)) for (const reaction of data.reactions) this.reactions.set(reaction.emoji.id || reaction.emoji.name, new MessageReaction(this, reaction.emoji, reaction.count, reaction.me));
		if (data.nonce !== undefined) this.nonce = data.nonce;
		if (data.pinned !== undefined) this.pinned = data.pinned;
		if (data.tts !== undefined) this.tts = data.tts;
		if (data.type !== undefined) this.type = data.type;
		this.system = this.author && this.author.system ? true : false;
		if (data.webhook_id !== undefined) this.webhookID = data.webhook_id;
		if (data.thread !== undefined) this.thread = data.thread ? new ThreadTextChannel(data.thread, this.client) : null;
	}
}

export = Message;

import User from "./User";
import GuildMember from "./GuildMember";
import Constants from "../constants";

class Message {
	public client: import("./Client");
	public id: string;
	public channel: import("./Partial/PartialChannel");
	public guild: import("./Partial/PartialGuild");
	public author: import("./User");
	public member: GuildMember | null;
	public attachments: Array<import("@amanda/discordtypings").AttachmentData>;
	public content: string;
	public editedAt: Date | null;
	public editedTimestamp: number | null;
	public embeds: Array<import("./MessageEmbed")>;
	public flags: number;
	public createdAt: Date;
	public createdTimestamp: number;
	public mentions: Array<GuildMember>;
	public nonce: string;
	public pinned: boolean;
	public tts: boolean;
	public type: number;
	public system: boolean;
	public webhookID: string | null;

	public constructor(data: import("@amanda/discordtypings").MessageData, client: import("./Client")) {
		this.client = client;
		this.id = data.id;

		const MessageEmbed = require("./MessageEmbed");
		const PartalGuild = require("./Partial/PartialGuild");
		const PartialChannel = require("./Partial/PartialChannel"); // lazy load

		this.channel = new PartialChannel({ id: data.channel_id, guild_id: data.guild_id }, client);
		this.guild = data.guild_id ? new PartalGuild({ id: data.guild_id }, client) : null;
		this.author = data.author ? data.author.id === this.client.user?.id ? this.client.user : new User(data.author, client) : new User({ username: "Discord", discriminator: "0000", id: Constants.SYSTEM_USER_ID, avatar: "d9fa72d57744dea056b12e2b34a87173" }, client);
		this.member = data.member && data.author ? new GuildMember({ user: data.author, ...data.member }, client) : null;
		this.attachments = data.attachments;
		this.content = data.content || "";
		this.editedAt = data.edited_timestamp ? new Date(data.edited_timestamp) : null;
		this.editedTimestamp = this.editedAt ? this.editedAt.getTime() : null;
		this.embeds = data.embeds && data.embeds.length > 0 ? data.embeds.map(embed => new MessageEmbed(embed, true)) : [];
		this.flags = data.flags;
		this.createdAt = new Date(data.timestamp);
		this.createdTimestamp = this.createdAt.getTime();
		this.mentions = data.mentions ? data.mentions.map(user => new GuildMember({ user, ...user.member }, client)) : [];
		this.nonce = data.nonce;
		this.pinned = data.pinned;
		this.tts = data.tts;
		this.type = data.type;
		this.system = this.author && this.author.system ? true : false;
		this.webhookID = data.webhook_id || null;
	}

	public toString() {
		return this.content;
	}

	public async edit(content: import("../types").StringResolvable, options: import("../types").MessageOptions = {}) {
		const TextBasedChannel = require("./Interfaces/TextBasedChannel");
		const msg = await this.client._snow.channel.editMessage(this.channel.id, this.id, TextBasedChannel.transform(content, options, true), { disableEveryone: options.disableEveryone || this.client._snow.options.disableEveryone || false });
		if (this.guild) msg.guild_id = this.guild.id;
		return new Message(msg, this.client);
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

	public async deleteReaction(user: string | User | GuildMember | import("./Partial/PartialUser"), emoji: string) {
		if (emoji.match(/^\d+$/)) throw new TypeError("The reaction provided must be in name:id format");
		const ceregex = /<?a?:?(\w+):(\d+)>?/;
		let value;
		const match = emoji.match(ceregex);
		if (match) value = `${match[1]}:${match[2]}`;
		else value = emoji;
		let userID;
		if (typeof user === "string") userID = user;
		else userID = user.id;
		if (userID === this.client.user?.id) await this.client._snow.channel.deleteReactionSelf(this.channel.id, this.id, encodeURIComponent(value));
		else await this.client._snow.channel.deleteReaction(this.channel.id, this.id, encodeURIComponent(value), userID);
		return this;
	}

	public async clearReactions() {
		await this.client._snow.channel.deleteAllReactions(this.channel.id, this.id);
		return this;
	}
}

export = Message;

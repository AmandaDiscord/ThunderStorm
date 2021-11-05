import PartialBase from "./PartialBase";

import MessagePayload from "../MessagePayload";
import Message from "../Message";
import MessageComponentInteractionCollector from "../MessageComponentInteractionCollector";
import ReactionCollector from "../ReactionCollector";

import MessageFlags from "../../util/MessageFlags";

import { ChannelTypes } from "../../util/Constants";

class PartialMessage extends PartialBase<import("../Message")> {
	public channel: import("./PartialChannel");
	public partialType: "Message" = "Message";

	public constructor(client: import("../../client/Client"), data: import("../../internal").PartialData) {
		super(client, data);

		const PartialChannel: typeof import("./PartialChannel") = require("./PartialChannel");

		this.channel = new PartialChannel(client, { id: data.channel_id as string, guild_id: data.guild_id, type: data.guild_id ? ChannelTypes[0] : ChannelTypes[1] });
		this.guild = this.channel.guild || null;
	}

	public get url() {
		return `https://discord.com/channels/${this.guild ? this.guild.Id : "@me"}/${this.channel.Id}/${this.Id}`;
	}

	public reply(options?: string | MessagePayload | import("../../Types").ReplyMessageOptions) {
		let data;

		if (options instanceof MessagePayload) {
			data = options;
		} else {
			data = MessagePayload.create(this, options, {
				reply: {
					messageReference: this,
					failIfNotExists: (options as import("../../Types").ReplyMessageOptions)?.failIfNotExists ?? true
				}
			});
		}
		return this.channel.send(data);
	}

	public async crosspost() {
		const data = await this.client._snow.channel.crosspostMessage(this.channel.Id, this.Id);
		return new Message(this.client, data, this.channel);
	}

	public async edit(options: string | import("../MessagePayload") | import("../../Types").MessageEditOptions = {}) {
		const opts = options instanceof MessagePayload ? options : MessagePayload.create(this, options);
		const { data, files } = opts.resolveData();
		const d = await this.client._snow.channel.editMessage(this.channel.Id, this.Id, Object.assign({}, data, { files: files }), { disableEveryone: (options as import("../../Types").MessageEditOptions).disableEveryone ? (options as import("../../Types").MessageEditOptions).disableEveryone : this.client.options.disableEveryone || false });
		return new Message(this.client, d, this.channel);
	}

	public async delete(): Promise<this> {
		await this.client._snow.channel.deleteMessage(this.channel.Id, this.Id);
		return this;
	}

	public async react(emoji: import("../../Types").EmojiIdentifierResolvable) {
		const ReactionEmoji: typeof import("../ReactionEmoji") = require("../ReactionEmoji");
		const GuildEmoji: typeof import("../GuildEmoji") = require("../GuildEmoji");
		if (typeof emoji === "string") {
			if (emoji.match(/^\d+$/)) emoji = `_:${emoji}`;
		} else {
			if (!emoji.name && !emoji.Id) throw new TypeError("MESSAGE_REACT_EMOJI_NOT_RESOLAVABLE");
			if (emoji instanceof ReactionEmoji || emoji instanceof GuildEmoji) emoji = emoji.identifier;
			else emoji = emoji.Id === null ? emoji.name as string : `${emoji.name ? emoji.name : "_"}:${emoji.Id}`;
		}
		const ceregex = /<?a?:?(\w+):(\d+)>?/;
		let value;
		const match = emoji.match(ceregex);
		if (match) value = `${match[1]}:${match[2]}`;
		else value = emoji;
		await this.client._snow.channel.createReaction(this.channel.Id, this.Id, encodeURIComponent(value));
		return this;
	}

	public async clearReactions() {
		await this.client._snow.channel.deleteAllReactions(this.channel.Id, this.Id);
		return this;
	}

	public async pin() {
		await this.client._snow.channel.addChannelPinnedMessage(this.channel.Id, this.Id);
		return this;
	}

	public async unpin() {
		await this.client._snow.channel.removeChannelPinnedMessage(this.channel.Id, this.Id);
		return this;
	}

	public suppressEmbeds(suppress = true) {
		const flags = new MessageFlags(0);

		if (suppress) {
			flags.add(MessageFlags.FLAGS.SUPPRESS_EMBEDS);
		} else {
			flags.remove(MessageFlags.FLAGS.SUPPRESS_EMBEDS);
		}

		return this.edit({ flags });
	}

	public removeAttachments() {
		return this.edit({ attachments: [] });
	}

	public createReactionCollector(filter: import("../../Types").CollectorFilter<import("../MessageReaction")>, options: import("../../Types").ReactionCollectorOptions = {}) {
		return new ReactionCollector(this, filter, options);
	}

	public awaitReactions(filter: import("../../Types").CollectorFilter<import("../MessageReaction")>, options: import("../../Types").AwaitReactionsOptions = {}): Promise<import("../../util/Collection")<string, import("../MessageReaction")>> {
		return new Promise((resolve, reject) => {
			const collector = this.createReactionCollector(filter, options);
			collector.once("end", (reactions, reason) => {
				if (options.errors && options.errors.includes(reason)) reject(reactions);
				else resolve(reactions);
			});
		});
	}

	public createMessageComponentInteractionCollector(filter: import("../../Types").CollectorFilter<import("../MessageComponentInteraction")>, options: import("../../Types").MessageComponentInteractionCollectorOptions = {}) {
		return new MessageComponentInteractionCollector(this, filter, options);
	}

	public awaitMessageComponentInteraction(filter: import("../../Types").CollectorFilter<import("../MessageComponentInteraction")>, time?: number): Promise<import("../MessageComponentInteraction")> {
		return new Promise((resolve, reject) => {
			const collector = this.createMessageComponentInteractionCollector(filter, { max: 1, time });
			collector.once("end", interactions => {
				const interaction = interactions.first();
				if (!interaction) reject(new Error("INTERACTION_COLLECTOR_TIMEOUT"));
				else resolve(interaction);
			});
		});
	}

	public toJSON() {
		const value: { channel_id: string; guild_id?: string } = { channel_id: this.channel.Id };
		if (this.guild) value["guild_id"] = this.guild.Id;
		return Object.assign(super.toJSON(), value);
	}
}

export = PartialMessage;

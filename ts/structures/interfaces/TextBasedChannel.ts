import MessageCollector from "../MessageCollector";
import MessagePayload from "../MessagePayload";
import SnowflakeUtil from "../../util/SnowflakeUtil";
import Collection from "../../util/Collection";
import { TypeError } from "../../errors";
import MessageComponentInteractionCollector from "../MessageComponentInteractionCollector";

abstract class TextBasedChannel {
	public id!: string;
	public lastMessageId: string | null = null;
	public lastPinTimestamp: number | null = null;
	public client!: import("../../client/Client");
	public type!: import("../../Types").ChannelType;

	public constructor() {
		void 0;
	}

	public get lastMessage() {
		const PartialMessage: typeof import("../Partial/PartialMessage") = require("../Partial/PartialMessage");
		let message = null;
		if (this.lastMessageId) {
			message = new PartialMessage(this.client, { id: this.lastMessageId, channel_id: this.id });
			if ((this as unknown as import("../TextChannel")).guild) message.guild = (this as unknown as import("../TextChannel")).guild;
		}
		return message;
	}

	public get lastPinAt() {
		return this.lastPinTimestamp ? new Date(this.lastPinTimestamp) : null;
	}

	public async send(options: string | MessagePayload | import("../../Types").MessageOptions): Promise<import("../Message")> {
		const User: typeof import("../User") = require("../User");
		const GuildMember: typeof import("../GuildMember") = require("../GuildMember");
		const Message: typeof import("../Message") = require("../Message");

		if (this instanceof User || this instanceof GuildMember) {
			return this.createDM().then(dm => dm.send(options));
		}

		let messagePayload;

		if (options instanceof MessagePayload) {
			messagePayload = options.resolveData();
		} else {
			messagePayload = MessagePayload.create(this, options).resolveData();
		}

		if (Array.isArray(messagePayload.data.content)) {
			// @ts-ignore
			return Promise.all(messagePayload.split().map(this.send.bind(this)));
		}

		const { data, files } = await messagePayload.resolveFiles();
		const d = await this.client._snow.channel.createMessage(this.id, Object.assign({}, data, { files: files }));
		const message = new Message(this.client, d, this);
		this.lastMessageId = message.id;
		return message;
	}

	public startTyping() {
		return this.sendTyping();
	}

	public sendTyping() {
		return this.client._snow.channel.startChannelTyping(this.id);
	}

	public stopTyping() {
		void 0;
	}

	public get typing() {
		return false;
	}

	public get typingCount() {
		return 0;
	}

	public createMessageCollector(filter: import("../../Types").CollectorFilter<import("../Message")>, options: import("../../Types").MessageCollectorOptions = {}) {
		return new MessageCollector(this, filter, options);
	}

	public awaitMessages(filter: import("../../Types").CollectorFilter<import("../Message")>, options: import("../../Types").AwaitMessagesOptions = {}): Promise<Collection<string, import("../Message")>> {
		return new Promise((resolve, reject) => {
			const collector = this.createMessageCollector(filter, options);
			collector.once("end", (collection, reason) => {
				if (options.errors && options.errors.includes(reason)) {
					reject(collection);
				} else {
					resolve(collection);
				}
			});
		});
	}

	public createMessageComponentInteractionCollector(filter: import("../../Types").CollectorFilter<import("../MessageComponentInteraction")>, options: import("../../Types").MessageComponentInteractionCollectorOptions = {}) {
		return new MessageComponentInteractionCollector(this, filter, options);
	}

	public awaitMessageComponentInteraction(filter: import("../../Types").CollectorFilter<import("../MessageComponentInteraction")>, time: number): Promise<import("../MessageComponentInteraction")> {
		return new Promise((resolve, reject) => {
			const collector = this.createMessageComponentInteractionCollector(filter, { max: 1, time });
			collector.once("end", interactions => {
				const interaction = interactions.first();
				if (!interaction) reject(new Error("INTERACTION_COLLECTOR_TIMEOUT"));
				else resolve(interaction);
			});
		});
	}

	public async bulkDelete(messages: Collection<string, import("../Message")> | Array<import("../../Types").MessageResolvable> | number, filterOld = false): Promise<Collection<string, import("../Partial/PartialMessage")>> {
		const PartialMessage: typeof import("../Partial/PartialMessage") = require("../Partial/PartialMessage");
		if (Array.isArray(messages) || messages instanceof Collection) {
			let messageIds: Array<string> = messages instanceof Collection ? messages.keyArray() : messages.map(m => typeof m === "string" ? m : m.id);
			if (filterOld) {
				messageIds = messageIds.filter(id => Date.now() - SnowflakeUtil.deconstruct(id).timestamp < 1209600000);
			}
			if (messageIds.length === 0) return new Collection();
			if (messageIds.length === 1) {
				await this.client._snow.channel.deleteMessage(this.id, messageIds[0]);
				return new Collection([[messageIds[0], new PartialMessage(this.client, { id: messageIds[0], channel_id: this.id, guild_id: (this as unknown as import("../TextChannel")).guild ? (this as unknown as import("../TextChannel")).guild.id : undefined })]]);
			}
			await this.client._snow.channel.bulkDeleteMessages(this.id, messageIds);
			const collection: Collection<string, import("../Partial/PartialMessage")> = new Collection();
			return messageIds.reduce(
				(col, id) =>
					col.set(
						id,
						new PartialMessage(this.client, { id: id, channel_id: this.id, guild_id: (this as unknown as import("../TextChannel")).guild ? (this as unknown as import("../TextChannel")).guild.id : undefined })
					),
				collection
			);
		}
		if (!isNaN(messages)) {
			const msgs = await this.client._snow.channel.getChannelMessages(this.id, { limit: messages });
			return this.bulkDelete(msgs.map(i => i.id), filterOld);
		}
		throw new TypeError("MESSAGE_BULK_DELETE_TYPE");
	}

	public async fetchMessage(message: import("../../Types").MessageResolvable) {
		const Message: typeof import("../Message") = require("../Message");
		let messageId;
		if (typeof message === "string") messageId = message;
		else messageId = message.id;

		const msg = await this.client._snow.channel.getChannelMessage(this.id, messageId);
		return new Message(this.client, msg, this);
	}

	public async fetchMessages(options?: import("../../Types").ChannelLogsQueryOptions) {
		const Message: typeof import("../Message") = require("../Message");
		const messages = await this.client._snow.channel.getChannelMessages(this.id, options);
		return new Collection(messages.map(m => [m.id, new Message(this.client, m, this)]));
	}

	public static applyToClass(structure: any, full = false, ignore: Array<keyof TextBasedChannel> = []) {
		const props: Array<keyof TextBasedChannel> = ["send"];
		if (full) {
			props.push(
				"lastMessage",
				"lastPinAt",
				"bulkDelete",
				"startTyping",
				"sendTyping",
				"stopTyping",
				"typing",
				"typingCount",
				"createMessageCollector",
				"awaitMessages",
				"createMessageComponentInteractionCollector",
				"awaitMessageComponentInteraction",
				"fetchMessage",
				"fetchMessages"
			);
		}
		for (const prop of props) {
			if (ignore.includes(prop)) continue;
			Object.defineProperty(
				structure.prototype,
				prop,
				Object.getOwnPropertyDescriptor(TextBasedChannel.prototype, prop) as PropertyDescriptor
			);
		}
	}
}

export = TextBasedChannel;

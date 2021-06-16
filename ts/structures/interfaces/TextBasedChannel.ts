import MessageCollector from "../MessageCollector";
import APIMessage from "../APIMessage";
import SnowflakeUtil from "../../util/SnowflakeUtil";
import Collection from "../../util/Collection";
import { TypeError } from "../../errors";
import MessageComponentInteractionCollector from "../MessageComponentInteractionCollector";

abstract class TextBasedChannel {
	public id!: string;
	public lastMessageID: string | null = null;
	public lastPinTimestamp: number | null = null;
	public client!: import("../../client/Client");
	public type!: import("../../Types").ChannelType | "unknown";

	public constructor() {
		void 0;
	}

	public get lastMessage() {
		const PartialMessage: typeof import("../Partial/PartialMessage") = require("../Partial/PartialMessage");
		let message = null;
		if (this.lastMessageID) {
			message = new PartialMessage(this.client, { id: this.lastMessageID, channel_id: this.id });
			// @ts-ignore
			if (this.guild) message.guild = this.guild;
		}
		return message;
	}

	public get lastPinAt() {
		return this.lastPinTimestamp ? new Date(this.lastPinTimestamp) : null;
	}

	public async send(options: string | APIMessage | import("../../Types").MessageOptions): Promise<import("../Message")> {
		const User: typeof import("../User") = require("../User");
		const GuildMember: typeof import("../GuildMember") = require("../GuildMember");
		const Message: typeof import("../Message") = require("../Message");

		if (this instanceof User || this instanceof GuildMember) {
			return this.createDM().then(dm => dm.send(options));
		}

		let apiMessage;

		if (options instanceof APIMessage) {
			apiMessage = options.resolveData();
		} else {
			apiMessage = APIMessage.create(this, options).resolveData();
		}

		if (Array.isArray(apiMessage.data.content)) {
			// @ts-ignore
			return Promise.all(apiMessage.split().map(this.send.bind(this)));
		}

		const { data, files } = await apiMessage.resolveFiles();
		const d = await this.client._snow.channel.createMessage(this.id, Object.assign({}, data, { files: files }));
		const message = new Message(this.client, d, this);
		this.lastMessageID = message.id;
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
			// @ts-ignore
			let messageIDs: Array<string> = messages instanceof Collection ? messages.keyArray() : messages.map(m => m.id || m);
			if (filterOld) {
				messageIDs = messageIDs.filter(id => Date.now() - SnowflakeUtil.deconstruct(id).timestamp < 1209600000);
			}
			if (messageIDs.length === 0) return new Collection();
			if (messageIDs.length === 1) {
				await this.client._snow.channel.deleteMessage(this.id, messageIDs[0]);
				// @ts-ignore
				return new Collection([[messageIDs[0], new PartialMessage(this.client, { id: messageIDs[0], channel_id: this.id, guild_id: this.guild ? this.guild.id : undefined })]]);
			}
			await this.client._snow.channel.bulkDeleteMessages(this.id, messageIDs);
			const collection: Collection<string, import("../Partial/PartialMessage")> = new Collection();
			return messageIDs.reduce(
				(col, id) =>
					col.set(
						id,
						// @ts-ignore
						new PartialMessage(this.client, { id: id, channel_id: this.id, guild_id: this.guild ? this.guild.id : undefined })
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
		let messageID;
		if (typeof message === "string") messageID = message;
		else messageID = message.id;

		const msg = await this.client._snow.channel.getChannelMessage(this.id, messageID);
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
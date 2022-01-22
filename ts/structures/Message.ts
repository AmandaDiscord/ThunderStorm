// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import MessagePayload from "./MessagePayload";
import Base from "./Base";
import BaseMessageComponent from "./BaseMessageComponent";
import ClientApplication from "./ClientApplication";
import MessageAttachment from "./MessageAttachment";
import MessageComponentInteractionCollector from "./MessageComponentInteractionCollector";
import Embed from "./MessageEmbed";
import Mentions from "./MessageMentions";
import ReactionCollector from "./ReactionCollector";
import Sticker from "./Sticker";
import { Error } from "../errors";
import { Collection } from "@discordjs/collection";
import { ChannelTypes, InteractionTypes, MessageTypes, SystemMessageTypes } from "../util/Constants";
import MessageFlags from "../util/MessageFlags";
import SnowflakeUtil from "../util/SnowflakeUtil";
import Util from "../util/Util";

// @ts-ignore
class Message extends Base {
	public partial: false = false;

	public channel: import("./interfaces/TextBasedChannel");
	public deleted = false;
	public type!: import("../Types").MessageType | null;
	public system!: boolean | null;
	public content!: string | null;
	public author!: import("./User") | null;
	public pinned!: boolean | null;
	public tts!: boolean | null;
	public nonce!: string | null;
	public embeds!: Array<import("./MessageEmbed")>;
	public components!: Array<import("./MessageActionRow")>;
	public attachments = new Collection<string, MessageAttachment>();
	public stickers = new Collection<string, Sticker>();
	public createdTimestamp!: number;
	public editedTimestamp!: number | null;
	public reactions!: Collection<string, import("./MessageReaction")>;
	public mentions!: import("./MessageMentions");
	public webhookId!: string | null;
	public groupActivityApplication!: import("./ClientApplication") | null;
	public applicationId!: string | null;
	public activity!: import("../Types").MessageActivity | null;
	public member!: import("./GuildMember");
	public flags!: Readonly<MessageFlags>;
	public reference!: import("../Types").MessageReference | null;
	public interaction!: import("../Types").MessageInteraction | null;

	public static readonly default = Message;

	public constructor(client: import("../client/Client"), data: import("discord-typings").MessageData, channel: import("./interfaces/TextBasedChannel")) {
		super(client);

		this.channel = channel;

		if (data) this._patch(data);
	}

	public _patch(data: import("discord-typings").MessageData) {
		const User: typeof import("./User") = require("./User");
		const MessageReaction: typeof import("./MessageReaction") = require("./MessageReaction");
		const GuildMember: typeof import("./GuildMember") = require("./GuildMember");

		this.id = data.id;

		if ("type" in data) {
			this.type = MessageTypes[data.type] as import("../Types").MessageType;
			this.system = SystemMessageTypes.includes(this.type as import("../Types").SystemMessageType);
		} else if (typeof this.type !== "string") {
			this.system = null;
			this.type = null;
		}

		if ("content" in data) {
			this.content = data.content as string;
		} else if (typeof this.content !== "string") {
			this.content = null;
		}

		if ("author" in data) {
			this.author = data.author.id === this.client.user!.id ? this.client.user : new User(this.client, data.author);
			if (data.author.id === this.client.user!.id) this.client.user!._patch(data.author);
		} else if (!this.author) {
			this.author = null;
		}

		if ("pinned" in data) {
			this.pinned = Boolean(data.pinned);
		} else if (typeof this.pinned !== "boolean") {
			this.pinned = null;
		}

		if ("tts" in data) {
			this.tts = data.tts;
		} else if (typeof this.tts !== "boolean") {
			this.tts = null;
		}

		this.nonce = "nonce" in data ? String(data.nonce) : null;
		this.embeds = (data.embeds || []).map(e => new Embed(e, true));
		this.components = (data.components ?? []).map(c => BaseMessageComponent.create(c as any, this.client)) as Array<import("./MessageActionRow")>;

		if (data.attachments) {
			for (const attachment of data.attachments) {
				this.attachments.set(attachment.id, new MessageAttachment(attachment.url, attachment.filename, attachment));
			}
		}

		this.stickers = new Collection();
		if (data.sticker_items) {
			for (const sticker of data.sticker_items) {
				this.stickers.set(sticker.id, new Sticker(this.client, sticker));
			}
		}

		this.createdTimestamp = SnowflakeUtil.deconstruct(this.id).timestamp;
		this.editedTimestamp = data.edited_timestamp ? new Date(data.edited_timestamp).getTime() : null;

		if (data.reactions && data.reactions.length > 0) {
			for (const reaction of data.reactions) {
				const react = new MessageReaction(this, reaction.emoji, reaction.count, reaction.me);
				this.reactions.set(react.emoji.identifier, react);
			}
		}

		this.mentions = new Mentions(this, data.mentions, data.mention_roles, data.mention_everyone, data.mention_channels);
		this.webhookId = data.webhook_id || null;
		this.groupActivityApplication = data.application ? new ClientApplication(this.client, data.application) : null;
		this.applicationId = data.application_id ?? null;
		this.activity = data.activity
			? {
				partyId: data.activity.party_id,
				type: data.activity.type
			}
			: null;

		if (this.member && data.member) {
			this.member._patch(data.member as any);
		} else if (data.member && this.guild && this.author) {
			this.member = new GuildMember(this.client, Object.assign({}, data.member, { user: this.author }));
		}

		this.flags = new MessageFlags(data.flags).freeze();

		this.reference = data.message_reference
			? {
				channelId: data.message_reference.channel_id as string,
				guildId: data.message_reference.guild_id || null,
				messageId: data.message_reference.message_id || null
			}
			: null;

		if (data.interaction) {
			this.interaction = {
				id: data.interaction.id,
				type: InteractionTypes[data.interaction.type],
				commandName: data.interaction.name,
				user: this.author && data.interaction.user.id === this.author.id ? this.author : new User(this.client, data.interaction.user)
			};
		} else if (!this.interaction) {
			this.interaction = null;
		}
	}

	public patch(data: import("discord-typings").MessageData) {
		const clone = this._clone();

		if (data.edited_timestamp) this.editedTimestamp = new Date(data.edited_timestamp).getTime();
		if ("content" in data) this.content = data.content as string;
		if ("pinned" in data) this.pinned = data.pinned;
		if ("tts" in data) this.tts = data.tts;
		if ("embeds" in data) this.embeds = data.embeds.map(e => new Embed(e, true));
		else this.embeds = this.embeds.slice();
		if ("components" in data) this.components = data.components!.map(c => BaseMessageComponent.create(c as any, this.client)) as Array<import("./MessageActionRow")>;
		else this.components = this.components.slice();

		if ("attachments" in data) {
			this.attachments = new Collection();
			for (const attachment of data.attachments) {
				this.attachments.set(attachment.id, new MessageAttachment(attachment.url, attachment.filename, attachment));
			}
		} else {
			this.attachments = new Collection(this.attachments.map(i => [i.id, i]));
		}

		this.mentions = new Mentions(
			this,
			"mentions" in data ? data.mentions : this.mentions.users.map(u => u.toJSON()),
			"mention_roles" in data ? data.mention_roles : this.mentions.roles.map(r => r.id),
			"mention_everyone" in data ? data.mention_everyone : this.mentions.everyone,
			"mention_channels" in data ? data.mention_channels : this.mentions.crosspostedChannels.map(i => i.toJSON())
		);

		this.flags = new MessageFlags("flags" in data ? data.flags : 0).freeze();

		return clone;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public get editedAt() {
		return this.editedTimestamp ? new Date(this.editedTimestamp) : null;
	}

	public get guild(): import("./Partial/PartialGuild") | null {
		return (this.channel as import("./TextChannel")).guild;
	}

	public get url() {
		return `https://discord.com/channels/${this.guild ? this.guild.id : "@me"}/${this.channel.id}/${this.id}`;
	}

	public get cleanContent() {
		return this.content != null ? Util.cleanContent(this.content, this) : null;
	}

	public createReactionCollector(filter: import("../Types").CollectorFilter<import("./MessageReaction")>, options: import("../Types").ReactionCollectorOptions = {}) {
		return new ReactionCollector(this, filter, options);
	}

	public awaitReactions(filter: import("../Types").CollectorFilter<import("./MessageReaction")>, options: import("../Types").AwaitReactionsOptions = {}): Promise<Collection<string, import("./MessageReaction")>> {
		return new Promise((resolve, reject) => {
			const collector = this.createReactionCollector(filter, options);
			collector.once("end", (reactions, reason) => {
				if (options.errors && options.errors.includes(reason)) reject(reactions);
				else resolve(reactions);
			});
		});
	}

	public createMessageComponentInteractionCollector(filter: import("../Types").CollectorFilter<import("./MessageComponentInteraction")>, options: import("../Types").MessageComponentInteractionCollectorOptions = {}) {
		return new MessageComponentInteractionCollector(this, filter, options);
	}

	public awaitMessageComponentInteraction(filter: import("../Types").CollectorFilter<import("./MessageComponentInteraction")>, time?: number): Promise<import("./MessageComponentInteraction")> {
		return new Promise((resolve, reject) => {
			const collector = this.createMessageComponentInteractionCollector(filter, { max: 1, time });
			collector.once("end", interactions => {
				const interaction = interactions.first();
				if (!interaction) reject(new Error("INTERACTION_COLLECTOR_TIMEOUT"));
				else resolve(interaction);
			});
		});
	}

	public get editable() {
		return this.author?.id === this.client.user!.id;
	}

	public get deletable() {
		return !this.deleted && this.author?.id === this.client.user!.id;
	}

	public get pinnable() {
		return this.type === "DEFAULT";
	}

	public fetchReference() {
		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");
		if (!this.reference) throw new Error("MESSAGE_REFERENCE_MISSING");
		const { channelId, messageId } = this.reference;
		const channel = new PartialChannel(this.client, { id: channelId, guild_id: this.guild?.id, type: this.guild?.id ? ChannelTypes[0] : ChannelTypes[1] });
		if (!channel) throw new Error("GUILD_CHANNEL_RESOLVE");
		return channel.fetchMessage(messageId as string);
	}

	public get crosspostable() {
		return this.channel.type === ChannelTypes[5] && !this.flags.has(MessageFlags.FLAGS.CROSSPOSTED) && this.type === "DEFAULT" && (this.author && this.author.id === this.client.user!.id);
	}

	public async edit(options: string | import("../Types").MessageEditOptions) {
		const opts = options instanceof MessagePayload ? options : MessagePayload.create(this, options);
		const { data, files } = opts.resolveData();
		const d = await this.client._snow.channel.editMessage(this.channel.id, this.id, Object.assign({}, data, { files: files }), { disableEveryone: (options as import("../Types").MessageEditOptions).disableEveryone ? (options as import("../Types").MessageEditOptions).disableEveryone : this.client.options.disableEveryone || false });
		return this._patch(d);
	}

	public async crosspost() {
		const d = await this.client._snow.channel.crosspostMessage(this.channel.id, this.id);
		this._patch(d);
		return this;
	}

	public async pin() {
		await this.client._snow.channel.addChannelPinnedMessage(this.channel.id, this.id);
		return this;
	}

	public async unpin() {
		await this.client._snow.channel.removeChannelPinnedMessage(this.channel.id, this.id);
		return this;
	}

	public async react(emoji: import("../Types").EmojiIdentifierResolvable) {
		const ReactionEmoji: typeof import("./ReactionEmoji") = require("./ReactionEmoji");
		const GuildEmoji: typeof import("./GuildEmoji") = require("./GuildEmoji");
		if (typeof emoji === "string") {
			if (emoji.match(/^\d+$/)) emoji = `_:${emoji}`;
		} else {
			if (!emoji.name && !emoji.id) throw new TypeError("MESSAGE_REACT_EMOJI_NOT_RESOLAVABLE");
			if (emoji instanceof ReactionEmoji || emoji instanceof GuildEmoji) emoji = emoji.identifier;
			else emoji = emoji.id === null ? emoji.name as string : `${emoji.name ? emoji.name : "_"}:${emoji.id}`;
		}
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

	public async delete(): Promise<this> {
		await this.client._snow.channel.deleteMessage(this.channel.id, this.id);
		return this;
	}

	public reply(options?: string | MessagePayload | import("../Types").ReplyMessageOptions) {
		let data;

		if (options instanceof MessagePayload) {
			data = options;
		} else {
			data = MessagePayload.create(this, options, {
				reply: {
					messageReference: this,
					failIfNotExists: (options as import("../Types").ReplyMessageOptions)?.failIfNotExists ?? true
				}
			});
		}
		return this.channel.send(data);
	}

	public async fetch() {
		const d = await this.client._snow.channel.getChannelMessage(this.channel.id, this.id);
		this._patch(d);
		return this;
	}

	public fetchWebhook() {
		if (!this.webhookId) return Promise.reject(new Error("WEBHOOK_MESSAGE"));
		return this.client.fetchWebhook(this.webhookId);
	}

	public suppressEmbeds(suppress = true) {
		const flags = new MessageFlags(this.flags.bitfield);

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

	public equals(message: Message, rawData: import("discord-typings").MessageData) {
		if (!message) return false;
		const embedUpdate = !message.author && !message.attachments;
		if (embedUpdate) return this.id === message.id && this.embeds.length === message.embeds.length;

		let equal =
			this.id === message.id &&
			!!this.author && this.author.id === message.author?.id &&
			this.content === message.content &&
			this.tts === message.tts &&
			this.nonce === message.nonce &&
			this.embeds.length === message.embeds.length &&
			this.attachments.size === message.attachments.size;

		if (equal && rawData) {
			equal =
				this.mentions.everyone === message.mentions.everyone &&
				this.createdTimestamp === new Date(rawData.timestamp).getTime() &&
				this.editedTimestamp === new Date(rawData.edited_timestamp || "").getTime();
		}

		return equal;
	}

	public toString() {
		return this.content;
	}

	public toJSON() {
		return super.toJSON({
			channel: "channelId",
			author: "authorId",
			groupActivityApplication: "groupActivityApplicationId",
			guild: "guildId",
			cleanContent: true,
			member: false,
			reactions: false
		});
	}
}

export = Message;

// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Collector from "./interfaces/Collector";
import { Collection } from "@discordjs/collection";
import { Events } from "../util/Constants";

interface CollectorEvents {
	collect: [import("./MessageComponentInteraction")];
	dispose: [import("./MessageComponentInteraction")];
	end: [import("@discordjs/collection").Collection<string, import("./MessageComponentInteraction")>, string];
}

interface MessageComponentInteractionCollector {
	addListener<E extends keyof CollectorEvents>(event: E, listener: (...args: CollectorEvents[E]) => any): this;
	emit<E extends keyof CollectorEvents>(event: E, ...args: CollectorEvents[E]): boolean;
	eventNames(): Array<keyof CollectorEvents>;
	listenerCount(event: keyof CollectorEvents): number;
	listeners(event: keyof CollectorEvents): Array<(...args: Array<any>) => any>;
	off<E extends keyof CollectorEvents>(event: E, listener: (...args: CollectorEvents[E]) => any): this;
	on<E extends keyof CollectorEvents>(event: E, listener: (...args: CollectorEvents[E]) => any): this;
	once<E extends keyof CollectorEvents>(event: E, listener: (...args: CollectorEvents[E]) => any): this;
	prependListener<E extends keyof CollectorEvents>(event: E, listener: (...args: CollectorEvents[E]) => any): this;
	prependOnceListener<E extends keyof CollectorEvents>(event: E, listener: (...args: CollectorEvents[E]) => any): this;
	rawListeners(event: keyof CollectorEvents): Array<(...args: Array<any>) => any>;
	removeAllListeners(event?: keyof CollectorEvents): this;
	removeListener<E extends keyof CollectorEvents>(event: E, listener: (...args: CollectorEvents[E]) => any): this;
}

// @ts-ignore
class MessageComponentInteractionCollector extends Collector<import("./MessageComponentInteraction")> {
	public message: import("./Message") | import("./Partial/PartialMessage") | null;
	public channel: import("./Partial/PartialChannel") | import("./TextChannel") | import("./DMChannel") | import("./NewsChannel") | import("./interfaces/TextBasedChannel");
	public users = new Collection<string, import("./User")>();
	public total = 0;
	public options!: import("../Types").MessageComponentInteractionCollectorOptions;

	public static readonly default = MessageComponentInteractionCollector;

	public constructor(source: import("./Message") | import("./Partial/PartialMessage") | import("./TextChannel") | import("./DMChannel") | import("./NewsChannel") | import("./interfaces/TextBasedChannel"), filter: import("../Types").CollectorFilter<import("./MessageComponentInteraction")>, options: import("../Types").MessageComponentInteractionCollectorOptions = {}) {
		super(source.client, filter, options);

		const Message: typeof import("./Message") = require("./Message");
		const PartialMessage: typeof import("./Partial/PartialMessage") = require("./Partial/PartialMessage");

		this.message = (source instanceof Message || source instanceof PartialMessage) ? source : null;
		this.channel = (source instanceof Message || source instanceof PartialMessage) ? (this.message as import("./Message")).channel : source;

		this.empty = this.empty.bind(this);
		this._handleChannelDeletion = this._handleChannelDeletion.bind(this);
		this._handleGuildDeletion = this._handleGuildDeletion.bind(this);
		this._handleMessageDeletion = this._handleMessageDeletion.bind(this);

		this.client.incrementMaxListeners();
		this.client.on(Events.INTERACTION_CREATE, this.handleCollect);

		if (this.message) this.client.on(Events.MESSAGE_DELETE, this._handleMessageDeletion);

		this.client.on(Events.CHANNEL_DELETE, this._handleChannelDeletion);
		this.client.on(Events.GUILD_DELETE, this._handleGuildDeletion);

		this.once("end", () => {
			this.client.removeListener(Events.INTERACTION_CREATE, this.handleCollect);

			if (this.message) this.client.removeListener(Events.MESSAGE_DELETE, this._handleMessageDeletion);

			this.client.removeListener(Events.CHANNEL_DELETE, this._handleChannelDeletion);
			this.client.removeListener(Events.GUILD_DELETE, this._handleGuildDeletion);
			this.client.decrementMaxListeners();
		});

		this.on("collect", interaction => {
			this.total++;
			this.users.set(interaction.user.id, interaction.user);
		});
	}

	public collect(interaction: import("./MessageComponentInteraction")): string | null {
		if (!interaction.isMessageComponent()) return null;

		if (this.message) {
			return interaction.message?.id === this.message.id ? interaction.id : null;
		}

		return interaction.channel?.id === this.channel?.id ? interaction.id : null;
	}

	public dispose(interaction: import("./MessageComponentInteraction")): string | null {
		if (!interaction.isMessageComponent()) return null;

		if (this.message) {
			return interaction.message?.id === this.message.id ? interaction.id : null;
		}

		return interaction.channel?.id === this.channel.id ? interaction.id : null;
	}

	public empty() {
		this.total = 0;
		this.collected.clear();
		this.users.clear();
		this.checkEnd();
	}

	public get endReason() {
		if (this.options.max && this.total >= this.options.max) return "limit";
		if (this.options.maxComponents && this.collected.size >= this.options.maxComponents) return "componentLimit";
		if (this.options.maxUsers && this.users.size >= this.options.maxUsers) return "userLimit";
		return null;
	}

	private _handleMessageDeletion(message: import("./Partial/PartialMessage")): void {
		if (message.id === this.message?.id) {
			this.stop("messageDelete");
		}
	}

	private _handleChannelDeletion(channel: import("./GuildChannel") | import("./Partial/PartialChannel")): void {
		if (channel.id === this.channel.id) {
			this.stop("channelDelete");
		}
	}

	private _handleGuildDeletion(guild: import("./Guild") | import("./Partial/PartialGuild")): void {
		if (guild.id === (this.channel as import("./GuildChannel")).guild?.id) {
			this.stop("guildDelete");
		}
	}
}

export = MessageComponentInteractionCollector;

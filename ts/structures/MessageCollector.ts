import Collector from "./interfaces/Collector";
import { Events } from "../util/Constants";

interface CollectorEvents {
	collect: [import("./Message")];
	dispose: [import("./Message")];
	end: [import("../util/Collection")<string, import("./Message")>, string];
}

interface MessageCollector {
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

class MessageCollector extends Collector<import("./Message")> {
	public channel: import("./interfaces/TextBasedChannel");
	public received: number;
	public options!: import("../Types").MessageCollectorOptions;

	public constructor(channel: import("./interfaces/TextBasedChannel"), filter: import("../Types").CollectorFilter<import("./Message")>, options: import("../Types").MessageCollectorOptions = {}) {
		super(channel.client, filter, options);

		this.channel = channel;
		this.received = 0;

		const bulkDeleteListener = (messages: any) => {
			for (const message of messages.values()) this.handleDispose(message);
		};
		this._handleChannelDeletion = this._handleChannelDeletion.bind(this);
		this._handleGuildDeletion = this._handleGuildDeletion.bind(this);

		this.client.incrementMaxListeners();
		this.client.on(Events.MESSAGE_CREATE, this.handleCollect);
		this.client.on(Events.MESSAGE_DELETE, this.handleDispose);
		this.client.on(Events.MESSAGE_BULK_DELETE, bulkDeleteListener);
		this.client.on(Events.CHANNEL_DELETE, this._handleChannelDeletion);
		this.client.on(Events.GUILD_DELETE, this._handleGuildDeletion);

		this.once("end", () => {
			this.client.removeListener(Events.MESSAGE_CREATE, this.handleCollect);
			this.client.removeListener(Events.MESSAGE_DELETE, this.handleDispose);
			this.client.removeListener(Events.MESSAGE_BULK_DELETE, bulkDeleteListener);
			this.client.removeListener(Events.CHANNEL_DELETE, this._handleChannelDeletion);
			this.client.removeListener(Events.GUILD_DELETE, this._handleGuildDeletion);
			this.client.decrementMaxListeners();
		});
	}

	public collect(message: import("./Message")) {
		if (message.channel.Id !== this.channel.Id) return null;
		this.received++;
		return message.Id;
	}

	public dispose(message: import("./Message")) {
		return message.channel.Id === this.channel.Id ? message.Id : null;
	}

	public get endReason(): "limit" | "processedLimit" | null {
		if (this.options.max && this.collected.size >= this.options.max) return "limit";
		if (this.options.maxProcessed && this.received === this.options.maxProcessed) return "processedLimit";
		return null;
	}

	private _handleChannelDeletion(channel: import("./interfaces/TextBasedChannel")) {
		if (channel.Id === this.channel.Id) this.stop("channelDelete");
	}

	private _handleGuildDeletion(guild: import("./Guild") | import("./Partial/PartialGuild")) {
		if ((this.channel as import("./TextChannel")).guild && guild.Id === (this.channel as import("./TextChannel")).guild.Id) this.stop("guildDelete");
	}
}

export = MessageCollector;

import Collector from "./interfaces/Collector";
import Collection from "../util/Collection";
import { Events } from "../util/Constants";

interface CollectorEvents {
	collect: [import("./MessageReaction"), import("./Partial/PartialUser")];
	dispose: [import("./MessageReaction"), import("./Partial/PartialUser")];
	end: [import("../util/Collection")<string, import("./MessageReaction")>, string];
	remove: [import("./MessageReaction"), import("./Partial/PartialUser")];
	create: [import("./MessageReaction"), import("./Partial/PartialUser")];
}

// @ts-ignore
interface ReactionCollector {
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
class ReactionCollector extends Collector<import("./MessageReaction")> {
	public message: import("./Message") | import("./Partial/PartialMessage");
	public users: Collection<string, import("./Partial/PartialUser")> = new Collection();
	public total = 0;
	public options!: import("../Types").ReactionCollectorOptions;

	public constructor(message: import("./Message") | import("./Partial/PartialMessage"), filter: import("../Types").CollectorFilter<import("./MessageReaction")>, options: import("../Types").ReactionCollectorOptions = {}) {
		super(message.client, filter, options);

		this.message = message;

		this.empty = this.empty.bind(this);
		this._handleChannelDeletion = this._handleChannelDeletion.bind(this);
		this._handleGuildDeletion = this._handleGuildDeletion.bind(this);
		this._handleMessageDeletion = this._handleMessageDeletion.bind(this);

		this.client.incrementMaxListeners();
		this.client.on(Events.MESSAGE_REACTION_ADD, this.handleCollect);
		this.client.on(Events.MESSAGE_REACTION_REMOVE, this.handleDispose);
		this.client.on(Events.MESSAGE_REACTION_REMOVE_ALL, this.empty);
		this.client.on(Events.MESSAGE_DELETE, this._handleMessageDeletion);
		this.client.on(Events.CHANNEL_DELETE, this._handleChannelDeletion);
		this.client.on(Events.GUILD_DELETE, this._handleGuildDeletion);

		this.once("end", () => {
			this.client.removeListener(Events.MESSAGE_REACTION_ADD, this.handleCollect);
			this.client.removeListener(Events.MESSAGE_REACTION_REMOVE, this.handleDispose);
			this.client.removeListener(Events.MESSAGE_REACTION_REMOVE_ALL, this.empty);
			this.client.removeListener(Events.MESSAGE_DELETE, this._handleMessageDeletion);
			this.client.removeListener(Events.CHANNEL_DELETE, this._handleChannelDeletion);
			this.client.removeListener(Events.GUILD_DELETE, this._handleGuildDeletion);
			this.client.decrementMaxListeners();
		});

		this.on("collect", (reaction, user) => {
			this.total++;
			this.users.set(user.id, user);
		});

		this.on("remove", (reaction, user) => {
			this.total--;
			if (!this.collected.some(r => r.users.has(user.id))) this.users.delete(user.id);
		});
	}

	public collect(reaction: import("./MessageReaction"), user: import("./Partial/PartialUser")) {
		if (reaction.message.id !== this.message.id) return null;
		// @ts-ignore
		if (reaction.count === 1 && this.filter(reaction, user, this.collected)) {
			this.emit("create", reaction, user);
		}

		return ReactionCollector.key(reaction);
	}

	public dispose(reaction: import("./MessageReaction"), user: import("./Partial/PartialUser")) {
		if (reaction.message.id !== this.message.id) return null;
		if (this.collected.has(ReactionCollector.key(reaction)) && this.users.has(user.id)) {
			this.emit("remove", reaction, user);
		}
		return reaction.count ? null : ReactionCollector.key(reaction);
	}

	public empty() {
		this.total = 0;
		this.collected.clear();
		this.users.clear();
		this.checkEnd();
	}

	public get endReason() {
		if (this.options.max && this.total >= this.options.max) return "limit";
		if (this.options.maxEmojis && this.collected.size >= this.options.maxEmojis) return "emojiLimit";
		if (this.options.maxUsers && this.users.size >= this.options.maxUsers) return "userLimit";
		return null;
	}

	public _handleMessageDeletion(message: import("./Partial/PartialMessage") | import("./Message")) {
		if (message.id === this.message.id) {
			this.stop("messageDelete");
		}
	}

	public _handleChannelDeletion(channel: import("./Partial/PartialChannel")) {
		if (channel.id === this.message.channel.id) {
			this.stop("channelDelete");
		}
	}

	public _handleGuildDeletion(guild: import("./Partial/PartialGuild") | import("./Guild")) {
		if (this.message.guild && guild.id === this.message.guild.id) {
			this.stop("guildDelete");
		}
	}

	public static key(reaction: import("./MessageReaction")) {
		return reaction.emoji.id || reaction.emoji.name;
	}
}

export = ReactionCollector;

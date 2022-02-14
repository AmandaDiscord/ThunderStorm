import Collector from "./interfaces/Collector";
import { Collection } from "@discordjs/collection";
interface CollectorEvents {
    collect: [import("./MessageReaction"), import("./Partial/PartialUser")];
    dispose: [import("./MessageReaction"), import("./Partial/PartialUser")];
    end: [import("@discordjs/collection").Collection<string, import("./MessageReaction")>, string];
    remove: [import("./MessageReaction"), import("./Partial/PartialUser")];
    create: [import("./MessageReaction"), import("./Partial/PartialUser")];
}
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
declare class ReactionCollector extends Collector<import("./MessageReaction")> {
    message: import("./Message") | import("./Partial/PartialMessage");
    users: Collection<string, import("./Partial/PartialUser")>;
    total: number;
    options: import("../Types").ReactionCollectorOptions;
    static readonly default: typeof ReactionCollector;
    constructor(message: import("./Message") | import("./Partial/PartialMessage"), filter: import("../Types").CollectorFilter<import("./MessageReaction")>, options?: import("../Types").ReactionCollectorOptions);
    collect(reaction: import("./MessageReaction"), user: import("./Partial/PartialUser")): string | null;
    dispose(reaction: import("./MessageReaction"), user: import("./Partial/PartialUser")): string | null;
    empty(): void;
    get endReason(): "limit" | "userLimit" | "emojiLimit" | null;
    _handleMessageDeletion(message: import("./Partial/PartialMessage") | import("./Message")): void;
    _handleChannelDeletion(channel: import("./Partial/PartialChannel")): void;
    _handleGuildDeletion(guild: import("./Partial/PartialGuild") | import("./Guild")): void;
    static key(reaction: import("./MessageReaction")): string;
}
export = ReactionCollector;

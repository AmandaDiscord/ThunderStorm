import Collector from "./interfaces/Collector";
interface CollectorEvents {
    collect: [import("./Message")];
    dispose: [import("./Message")];
    end: [import("@discordjs/collection").Collection<string, import("./Message")>, string];
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
declare class MessageCollector extends Collector<import("./Message")> {
    channel: import("./interfaces/TextBasedChannel");
    received: number;
    options: import("../Types").MessageCollectorOptions;
    static readonly default: typeof MessageCollector;
    constructor(channel: import("./interfaces/TextBasedChannel"), filter: import("../Types").CollectorFilter<import("./Message")>, options?: import("../Types").MessageCollectorOptions);
    collect(message: import("./Message")): string | null;
    dispose(message: import("./Message")): string | null;
    get endReason(): "limit" | "processedLimit" | null;
    private _handleChannelDeletion;
    private _handleGuildDeletion;
}
export = MessageCollector;

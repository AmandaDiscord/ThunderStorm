import Collector from "./interfaces/Collector";
import Collection from "../util/Collection";
interface CollectorEvents {
    collect: [import("./MessageComponentInteraction")];
    dispose: [import("./MessageComponentInteraction")];
    end: [import("../util/Collection")<string, import("./MessageComponentInteraction")>, string];
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
declare class MessageComponentInteractionCollector extends Collector<import("./MessageComponentInteraction")> {
    message: import("./Message") | import("./Partial/PartialMessage") | null;
    channel: import("./Partial/PartialChannel") | import("./TextChannel") | import("./DMChannel") | import("./NewsChannel") | import("./interfaces/TextBasedChannel");
    users: Collection<string, import("./User")>;
    total: number;
    options: import("../Types").MessageComponentInteractionCollectorOptions;
    constructor(source: import("./Message") | import("./Partial/PartialMessage") | import("./TextChannel") | import("./DMChannel") | import("./NewsChannel") | import("./interfaces/TextBasedChannel"), filter: import("../Types").CollectorFilter<import("./MessageComponentInteraction")>, options?: import("../Types").MessageComponentInteractionCollectorOptions);
    collect(interaction: import("./MessageComponentInteraction")): string | null;
    dispose(interaction: import("./MessageComponentInteraction")): string | null;
    empty(): void;
    get endReason(): "limit" | "userLimit" | "componentLimit" | null;
    private _handleMessageDeletion;
    private _handleChannelDeletion;
    private _handleGuildDeletion;
}
export = MessageComponentInteractionCollector;

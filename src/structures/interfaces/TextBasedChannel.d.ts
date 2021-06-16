import MessageCollector from "../MessageCollector";
import APIMessage from "../APIMessage";
import Collection from "../../util/Collection";
import MessageComponentInteractionCollector from "../MessageComponentInteractionCollector";
declare abstract class TextBasedChannel {
    id: string;
    lastMessageID: string | null;
    lastPinTimestamp: number | null;
    client: import("../../client/Client");
    type: import("../../Types").ChannelType | "unknown";
    constructor();
    get lastMessage(): import("../Partial/PartialMessage") | null;
    get lastPinAt(): Date | null;
    send(options: string | APIMessage | import("../../Types").MessageOptions): Promise<import("../Message")>;
    startTyping(): Promise<void>;
    sendTyping(): Promise<void>;
    stopTyping(): void;
    get typing(): boolean;
    get typingCount(): number;
    createMessageCollector(filter: import("../../Types").CollectorFilter<import("../Message")>, options?: import("../../Types").MessageCollectorOptions): MessageCollector;
    awaitMessages(filter: import("../../Types").CollectorFilter<import("../Message")>, options?: import("../../Types").AwaitMessagesOptions): Promise<Collection<string, import("../Message")>>;
    createMessageComponentInteractionCollector(filter: import("../../Types").CollectorFilter<import("../MessageComponentInteraction")>, options?: import("../../Types").MessageComponentInteractionCollectorOptions): MessageComponentInteractionCollector;
    awaitMessageComponentInteraction(filter: import("../../Types").CollectorFilter<import("../MessageComponentInteraction")>, time: number): Promise<import("../MessageComponentInteraction")>;
    bulkDelete(messages: Collection<string, import("../Message")> | Array<import("../../Types").MessageResolvable> | number, filterOld?: boolean): Promise<Collection<string, import("../Partial/PartialMessage")>>;
    fetchMessage(message: import("../../Types").MessageResolvable): Promise<import("../Message")>;
    fetchMessages(options?: import("../../Types").ChannelLogsQueryOptions): Promise<Collection<string, import("../Message")>>;
    static applyToClass(structure: any, full?: boolean, ignore?: Array<keyof TextBasedChannel>): void;
}
export = TextBasedChannel;

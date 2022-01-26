import PartialBase from "./PartialBase";
import MessagePayload from "../MessagePayload";
import Message from "../Message";
import MessageComponentInteractionCollector from "../MessageComponentInteractionCollector";
import ReactionCollector from "../ReactionCollector";
declare class PartialMessage extends PartialBase<import("../Message")> {
    channel: import("./PartialChannel");
    partialType: "Message";
    static readonly default: typeof PartialMessage;
    constructor(client: import("../../client/Client"), data: import("../../internal").PartialData);
    get url(): string;
    reply(options?: string | MessagePayload | import("../../Types").ReplyMessageOptions): Promise<Message>;
    crosspost(): Promise<Message>;
    edit(options?: string | import("../MessagePayload") | import("../../Types").MessageEditOptions): Promise<Message>;
    delete(): Promise<this>;
    react(emoji: import("../../Types").EmojiIdentifierResolvable): Promise<this>;
    clearReactions(): Promise<this>;
    pin(): Promise<this>;
    unpin(): Promise<this>;
    suppressEmbeds(suppress?: boolean): Promise<Message>;
    removeAttachments(): Promise<Message>;
    createReactionCollector(filter: import("../../Types").CollectorFilter<import("../MessageReaction")>, options?: import("../../Types").ReactionCollectorOptions): ReactionCollector;
    awaitReactions(filter: import("../../Types").CollectorFilter<import("../MessageReaction")>, options?: import("../../Types").AwaitReactionsOptions): Promise<import("@discordjs/collection").Collection<string, import("../MessageReaction")>>;
    createMessageComponentInteractionCollector(filter: import("../../Types").CollectorFilter<import("../MessageComponentInteraction")>, options?: import("../../Types").MessageComponentInteractionCollectorOptions): MessageComponentInteractionCollector;
    awaitMessageComponentInteraction(filter: import("../../Types").CollectorFilter<import("../MessageComponentInteraction")>, time?: number): Promise<import("../MessageComponentInteraction")>;
    toJSON(): {
        id: string;
    } & {
        channel_id: string;
        guild_id?: string | undefined;
    };
}
export = PartialMessage;

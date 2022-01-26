import TextBasedChannel from "../interfaces/TextBasedChannel";
import PartialBase from "./PartialBase";
import Constants from "../../util/Constants";
declare class PartialThreadChannel extends PartialBase<import("../ThreadTextChannel") | import("../ThreadNewsChannel")> implements TextBasedChannel {
    readonly lastPinAt: TextBasedChannel["lastPinAt"];
    lastPinTimestamp: TextBasedChannel["lastPinTimestamp"];
    lastMessageId: TextBasedChannel["lastMessageId"];
    readonly lastMessage: TextBasedChannel["lastMessage"];
    send: TextBasedChannel["send"];
    startTyping: TextBasedChannel["startTyping"];
    sendTyping: TextBasedChannel["sendTyping"];
    stopTyping: TextBasedChannel["stopTyping"];
    readonly typingCount: TextBasedChannel["typingCount"];
    readonly typing: TextBasedChannel["typing"];
    createMessageCollector: TextBasedChannel["createMessageCollector"];
    awaitMessages: TextBasedChannel["awaitMessages"];
    createMessageComponentInteractionCollector: TextBasedChannel["createMessageComponentInteractionCollector"];
    awaitMessageComponentInteraction: TextBasedChannel["awaitMessageComponentInteraction"];
    bulkDelete: TextBasedChannel["bulkDelete"];
    fetchMessage: TextBasedChannel["fetchMessage"];
    fetchMessages: TextBasedChannel["fetchMessages"];
    type: typeof Constants.ChannelTypes[11];
    partialType: "Thread";
    guild: import("./PartialGuild") | null;
    parent: import("./PartialChannel");
    memberCount: number;
    static readonly default: typeof PartialThreadChannel;
    constructor(guild: import("./PartialGuild"), data: import("../../internal").PartialData);
    toString(): string;
    toJSON(): {
        id: string;
        guild_id: string | null;
        parent_id: string;
        member_count: number;
    };
}
export = PartialThreadChannel;

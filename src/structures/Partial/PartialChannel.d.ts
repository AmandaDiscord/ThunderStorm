import TextBasedChannel from "../Interfaces/TextBasedChannel";
import PartialBase from "./PartialBase";
declare class PartialChannel extends PartialBase<import("../Channel")> implements TextBasedChannel {
    readonly lastPinAt: TextBasedChannel["lastPinAt"];
    lastPinTimestamp: TextBasedChannel["lastPinTimestamp"];
    lastMessageID: TextBasedChannel["lastMessageID"];
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
    type: import("../../Types").ChannelType | "unknown";
    partialType: "Channel";
    guild: import("./PartialGuild") | null;
    name: string;
    permissions: import("../../util/Permissions");
    topic: string | null;
    constructor(client: import("../../client/Client"), data: import("../../internal").PartialData);
    toString(): string;
    toJSON(): {
        id: string;
        guild_id: string | null;
        type: number;
        name: string;
        permissions: string;
    };
}
export = PartialChannel;

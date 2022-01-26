import TextBasedChannel from "./interfaces/TextBasedChannel";
import Channel from "./Channel";
import Constants from "../util/Constants";
import User from "./User";
declare class DMChannel extends Channel implements TextBasedChannel {
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
    fetchMessage: TextBasedChannel["fetchMessage"];
    fetchMessages: TextBasedChannel["fetchMessages"];
    recipient: User;
    type: typeof Constants.ChannelTypes[1];
    static readonly default: typeof DMChannel;
    constructor(client: import("../client/Client"), data: import("discord-typings").DMChannelData);
    toJSON(): import("discord-typings").DMChannelData;
    _patch(data: import("discord-typings").DMChannelData & {
        name?: string;
    }): void;
}
export = DMChannel;

import TextBasedChannel from "./interfaces/TextBasedChannel";
import Channel from "./Channel";
import User from "./User";
declare class DMChannel extends Channel implements TextBasedChannel {
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
    fetchMessage: TextBasedChannel["fetchMessage"];
    fetchMessages: TextBasedChannel["fetchMessages"];
    recipient: User;
    type: "dm";
    constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").DMChannelData);
    toJSON(): import("@amanda/discordtypings").DMChannelData;
    _patch(data: import("@amanda/discordtypings").DMChannelData & {
        name?: string;
    }): void;
}
export = DMChannel;

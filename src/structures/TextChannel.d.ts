import TextBasedChannel from "./interfaces/TextBasedChannel";
import GuildChannel from "./GuildChannel";
declare class TextChannel extends GuildChannel implements TextBasedChannel {
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
    nsfw: boolean;
    rateLimitPerUser: number;
    topic: string;
    type: "text";
    constructor(guild: import("./Partial/PartialGuild"), data: import("@amanda/discordtypings").TextChannelData);
    toJSON(): import("@amanda/discordtypings").TextChannelData;
    _patch(data: import("@amanda/discordtypings").TextChannelData): void;
}
export = TextChannel;

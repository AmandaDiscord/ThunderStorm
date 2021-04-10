import GuildChannel from "./GuildChannel";
declare class TextChannel extends GuildChannel {
    lastMessageID: string | null;
    lastPinAt: Date | null;
    lastPinTimestamp: number | null;
    nsfw: boolean;
    rateLimitPerUser: number;
    topic: string;
    type: "text";
    constructor(data: import("@amanda/discordtypings").TextChannelData, client: import("./Client"));
    toJSON(): import("@amanda/discordtypings").TextChannelData;
    send(content: import("../Types").StringResolvable, options?: import("../Types").MessageOptions): Promise<import("./Message")>;
    sendTyping(): Promise<void>;
    deleteMessage(messageID: string, timeout?: number): Promise<void>;
    fetchMessage(messageID: string): Promise<import("./Message")>;
    fetchMessages(options?: import("./Interfaces/TextBasedChannel").FetchMessageOptions): Promise<import("./Message")[]>;
}
export = TextChannel;

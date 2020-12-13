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
    toJSON(): {
        id: string;
        name: string;
        guild_id: string;
        parent_id: string | null;
        position: number;
        last_message_id: string | null;
        last_pin_timestamp: number | null;
        nsfw: boolean;
        rate_limit_per_user: number;
        topic: string;
        type: number;
    };
    send(content: import("../Types").StringResolvable, options?: import("../Types").MessageOptions): Promise<import("./Message")>;
    sendTyping(): Promise<void>;
    deleteMessage(messageID: string, timeout?: number): Promise<void>;
    fetchMessage(messageID: string): Promise<import("./Message")>;
    fetchMessages(options?: import("./Interfaces/TextBasedChannel").FetchMessageOptions): Promise<import("./Message")[]>;
}
export = TextChannel;

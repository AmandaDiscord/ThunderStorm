import GuildChannel from "./GuildChannel";
declare class NewsChannel extends GuildChannel {
    type: "news";
    constructor(data: import("@amanda/discordtypings").NewsChannelData, client: import("./Client"));
    send(content: import("../Types").StringResolvable, options?: import("../Types").MessageOptions): Promise<import("./Message")>;
    toJSON(): {
        id: string;
        name: string;
        guild_id: string;
        parent_id: string | null;
        position: number;
        type: number;
    };
    sendTyping(): Promise<void>;
    deleteMessage(messageID: string, timeout?: number): Promise<void>;
    fetchMessage(messageID: string): Promise<import("./Message")>;
}
export = NewsChannel;

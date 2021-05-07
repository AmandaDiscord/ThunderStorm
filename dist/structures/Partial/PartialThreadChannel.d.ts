import PartialBase from "./PartialBase";
declare class PartialThreadChannel extends PartialBase<import("../ThreadTextChannel") | import("../ThreadNewsChannel")> {
    partialType: "Thread";
    guild: import("./PartialGuild") | null;
    parent: import("./PartialChannel");
    memberCount: number;
    constructor(data: import("../../internal").PartialData, client: import("../Client"));
    toString(): string;
    toJSON(): {
        id: string;
        guild_id: string | null;
        parent_id: string;
        member_count: number;
    };
    send(content: import("../../Types").StringResolvable, options?: import("../../Types").MessageOptions): Promise<import("../Message")>;
    deleteMessage(messageID: string, timeout?: number): Promise<void>;
    fetchMessage(messageID: string): Promise<import("../Message")>;
    fetchMessages(options?: import("../Interfaces/TextBasedChannel").FetchMessageOptions): Promise<import("../Message")[]>;
    sendTyping(): Promise<void>;
}
export = PartialThreadChannel;

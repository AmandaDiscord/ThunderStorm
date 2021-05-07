import PartialBase from "./PartialBase";
import PartialGuild from "./PartialGuild";
declare class PartialChannel extends PartialBase<import("../Channel")> {
    type: "text" | "dm" | "voice" | "unknown";
    partialType: "Channel";
    guild: PartialGuild | null;
    name: string;
    constructor(data: import("../../internal").PartialData, client: import("../Client"));
    toString(): string;
    toJSON(): {
        id: string;
        guild_id: string | null;
        type: number;
        name: string;
    };
    send(content: import("../../Types").StringResolvable, options?: import("../../Types").MessageOptions): Promise<import("../Message")>;
    deleteMessage(messageID: string, timeout?: number): Promise<void>;
    fetchMessage(messageID: string): Promise<import("../Message")>;
    fetchMessages(options?: import("../Interfaces/TextBasedChannel").FetchMessageOptions): Promise<import("../Message")[]>;
    sendTyping(): Promise<void>;
}
export = PartialChannel;

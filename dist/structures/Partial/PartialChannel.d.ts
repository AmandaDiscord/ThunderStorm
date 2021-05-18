import Constants from "../../Constants";
import PartialBase from "./PartialBase";
declare class PartialChannel extends PartialBase<import("../Channel")> {
    type: typeof Constants.CHANNEL_TYPES[keyof typeof Constants.CHANNEL_TYPES] | "unknown";
    partialType: "Channel";
    guild: import("./PartialGuild") | null;
    name: string;
    permissions: import("../Permissions");
    constructor(data: import("../../internal").PartialData, client: import("../Client"));
    toString(): string;
    toJSON(): {
        id: string;
        guild_id: string | null;
        type: number;
        name: string;
        permissions: string;
    };
    send(content: import("../../Types").StringResolvable, options?: import("../../Types").MessageOptions): Promise<import("../Message")>;
    deleteMessage(messageID: string, timeout?: number): Promise<void>;
    fetchMessage(messageID: string): Promise<import("../Message")>;
    fetchMessages(options?: import("../Interfaces/TextBasedChannel").FetchMessageOptions): Promise<import("../Message")[]>;
    sendTyping(): Promise<void>;
}
export = PartialChannel;

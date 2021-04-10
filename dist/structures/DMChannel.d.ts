import Channel from "./Channel";
declare class DMChannel extends Channel {
    lastMessageID: string | null;
    lastPinAt: Date | null;
    lastPinTimestamp: number | null;
    recipients: Map<string, import("./User")>;
    type: "dm";
    constructor(data: import("@amanda/discordtypings").DMChannelData, client: import("./Client"));
    toJSON(): import("@amanda/discordtypings").DMChannelData;
    send(content: import("../Types").StringResolvable, options?: import("../Types").MessageOptions): Promise<import("./Message")>;
    sendTyping(): Promise<void>;
    deleteMessage(messageID: string, timeout?: number): Promise<void>;
    fetchMessage(messageID: string): Promise<import("./Message")>;
}
export = DMChannel;

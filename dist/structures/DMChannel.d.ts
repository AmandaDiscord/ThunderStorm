import Channel from "./Channel";
declare class DMChannel extends Channel {
    lastMessageID: string | null;
    lastPinAt: Date | null;
    lastPinTimestamp: number | null;
    recipients: Map<string, import("./User")>;
    type: "dm";
    constructor(data: import("@amanda/discordtypings").DMChannelData, client: import("./Client"));
    toJSON(): {
        id: string;
        name: string;
        last_message_id: string | null;
        last_pin_timestamp: Date | null;
        recipients: {
            username: string;
            discriminator: string;
            bot: boolean;
            id: string;
            avatar: string | null;
            public_flags: number;
        }[];
        type: number;
    };
    send(content: import("../types").StringResolvable, options?: import("../types").MessageOptions): Promise<import("./Message")>;
    sendTyping(): Promise<void>;
    deleteMessage(messageID: string, timeout?: number): Promise<void>;
    fetchMessage(messageID: string): Promise<import("./Message")>;
}
export = DMChannel;

export declare function send(instance: import("../Partial/PartialBase")<any> | import("../Channel") | import("../User") | import("../GuildMember"), content: import("../../Types").StringResolvable, options?: import("../../Types").MessageOptions | undefined): Promise<import("../Message")>;
export declare function deleteMessage(client: import("../Client"), channelID: string, messageID: string, timeout?: number | undefined): Promise<void>;
export declare function fetchMessage(client: import("../Client"), channelID: string, messageID: string): Promise<import("../Message")>;
export declare function transform(content: import("../../Types").StringResolvable, options?: import("../../Types").MessageOptions, isEdit?: boolean | undefined): {
    content?: string | null;
    embeds?: Array<any>;
    nonce?: string;
    tts?: boolean;
    file?: any;
};
export declare function sendTyping(client: import("../Client"), channelID: string): Promise<void>;
declare const _default: {
    send: typeof send;
    sendTyping: typeof sendTyping;
    deleteMessage: typeof deleteMessage;
    fetchMessage: typeof fetchMessage;
    transform: typeof transform;
};
export default _default;

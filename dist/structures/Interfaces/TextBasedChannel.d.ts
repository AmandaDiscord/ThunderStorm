export interface FetchMessageOptions {
    limit?: number;
    before?: string;
    after?: string;
    around?: string;
}
declare type PartialMessagable = import("../Partial/PartialBase")<import("../Channel") | import("../User") | (import("../ThreadTextChannel") | import("../ThreadNewsChannel"))>;
export declare function send(instance: PartialMessagable | import("../Channel") | import("../User") | import("../GuildMember"), content: import("../../Types").StringResolvable, options?: import("../../Types").MessageOptions): Promise<import("../Message")>;
export declare function send(instance: import("../Message") | import("../Partial/PartialMessage"), content: import("../../Types").StringResolvable, options?: import("../../Types").MessageOptions): Promise<import("@amanda/discordtypings").MessageData>;
export declare function deleteMessage(client: import("../Client"), channelID: string, messageID: string, timeout?: number | undefined): Promise<void>;
export declare function fetchMessage(client: import("../Client"), channelID: string, messageID: string): Promise<import("../Message")>;
export declare function fetchMessages(client: import("../Client"), channelID: string, options?: FetchMessageOptions): Promise<Array<import("../Message")>>;
export declare function transform(content: import("../../Types").StringResolvable | import("../../Types").MessageOptions, options?: import("../../Types").MessageOptions | import("../../Types").InteractionMessageOptions, isEdit?: boolean, isWebhook?: boolean): Promise<{
    content?: string | null;
    embed?: import("@amanda/discordtypings").EmbedData;
    embeds?: Array<import("@amanda/discordtypings").EmbedData>;
    nonce?: string;
    tts?: boolean;
    file?: any;
    flags?: number;
    allowed_mentions?: Partial<import("@amanda/discordtypings").AllowedMentionsData>;
    components?: Array<import("@amanda/discordtypings").MessageComponentData>;
}>;
export declare function sendTyping(client: import("../Client"), channelID: string): Promise<void>;
declare const _default: {
    send: typeof send;
    sendTyping: typeof sendTyping;
    deleteMessage: typeof deleteMessage;
    fetchMessage: typeof fetchMessage;
    fetchMessages: typeof fetchMessages;
    transform: typeof transform;
};
export default _default;

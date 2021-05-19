import PartialBase from "./PartialBase";
import Message from "../Message";
declare class PartialMessage extends PartialBase<import("../Message")> {
    channel: import("./PartialChannel");
    guild: import("./PartialGuild") | null;
    partialType: "Message";
    constructor(data: import("../../internal").PartialData, client: import("../Client"));
    reply(content: import("../../Types").StringResolvable, options?: Exclude<import("../../Types").MessageOptions, "suppress">): Promise<Message>;
    edit(content: import("../../Types").StringResolvable, options?: Exclude<import("../../Types").MessageOptions, "nonce">): Promise<Message>;
    /**
     * @param timeout timeout in ms to delete the Message.
     */
    delete(timeout?: number): Promise<this>;
    react(emoji: string): Promise<this>;
    clearReactions(): Promise<this>;
    toJSON(): {
        id: string;
    } & {
        channel_id: string;
        guild_id?: string | undefined;
    };
}
export = PartialMessage;

import PartialBase from "./PartialBase";
import PartialChannel from "./PartialChannel";
import PartialGuild from "./PartialGuild";
import Message from "../Message";
declare class PartialMessage extends PartialBase<import("../Message")> {
    channel: PartialChannel;
    guild: PartialGuild | null;
    partialType: "Message";
    constructor(data: import("../../internal").PartialData, client: import("../Client"));
    edit(content: import("../../Types").StringResolvable, options?: import("../../Types").MessageOptions): Promise<Message>;
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

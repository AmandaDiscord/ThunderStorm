import { Collection } from "@discordjs/collection";
declare class MessageReaction {
    message: import("./Message") | import("./Partial/PartialMessage");
    me: boolean;
    count: number;
    users: Collection<string, import("./User")>;
    emoji: import("./ReactionEmoji");
    static readonly default: typeof MessageReaction;
    constructor(message: import("./Message") | import("./Partial/PartialMessage"), emoji: import("discord-typings").ReactionData["emoji"], count: number, me: boolean);
    remove(user?: import("../Types").UserResolvable): Promise<MessageReaction>;
    removeAll(): Promise<MessageReaction>;
    fetchUsers(): Promise<Collection<string, import("./User")>>;
}
export = MessageReaction;

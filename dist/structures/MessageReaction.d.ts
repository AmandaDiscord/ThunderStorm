import Collection from "./Util/Collection";
declare class MessageReaction {
    message: import("./Message") | import("./Partial/PartialMessage");
    me: boolean;
    count: number;
    users: Collection<string, import("./User")>;
    emoji: import("./ReactionEmoji");
    constructor(message: import("./Message") | import("./Partial/PartialMessage"), emoji: import("@amanda/discordtypings").ReactionData["emoji"], count: number, me: boolean);
    remove(user?: import("../Types").UserResolvable): Promise<MessageReaction>;
    removeAll(): Promise<MessageReaction>;
    fetchUsers(): Promise<Collection<string, import("./User")>>;
}
export = MessageReaction;

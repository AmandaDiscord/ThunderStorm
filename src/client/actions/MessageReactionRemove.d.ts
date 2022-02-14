import Action from "./Action";
declare class MessageReactionRemove extends Action {
    static readonly default: typeof MessageReactionRemove;
    handle(data: import("discord-typings").MessageReactionRemoveData): false | {
        message: import("../../structures/Partial/PartialMessage") | import("../../structures/Message");
        reaction: import("../../structures/MessageReaction");
        user: import("../../structures/Partial/PartialUser");
    };
}
export = MessageReactionRemove;

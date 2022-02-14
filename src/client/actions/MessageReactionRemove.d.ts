import Action from "./Action";
declare class MessageReactionRemove extends Action {
    static readonly default: typeof MessageReactionRemove;
    handle(data: import("discord-typings").MessageReactionRemoveData): false | {
        message: import("../../structures/Message") | import("../../structures/Partial/PartialMessage");
        reaction: import("../../structures/MessageReaction");
        user: import("../../structures/Partial/PartialUser");
    };
}
export = MessageReactionRemove;

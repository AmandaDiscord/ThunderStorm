import Action from "./Action";
declare class MessageReactionAdd extends Action {
    static readonly default: typeof MessageReactionAdd;
    handle(data: import("discord-typings").MessageReactionAddData): false | {
        message: import("../../structures/Message") | import("../../structures/Partial/PartialMessage");
        reaction: import("../../structures/MessageReaction");
        user: import("../../structures/Partial/PartialUser");
    };
}
export = MessageReactionAdd;

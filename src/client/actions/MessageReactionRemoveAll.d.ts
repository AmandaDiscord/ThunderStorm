import Action from "./Action";
declare class MessageReactionRemoveAll extends Action {
    static readonly default: typeof MessageReactionRemoveAll;
    handle(data: import("discord-typings").MessageReactionRemoveAllData): {
        message: import("../../structures/Partial/PartialMessage");
    };
}
export = MessageReactionRemoveAll;

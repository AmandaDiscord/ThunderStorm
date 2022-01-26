import Action from "./Action";
declare class MessageReactionRemoveEmoji extends Action {
    static readonly default: typeof MessageReactionRemoveEmoji;
    handle(data: import("discord-typings").MessageReactionRemoveEmojiData): {
        reaction: import("../../structures/MessageReaction");
    };
}
export = MessageReactionRemoveEmoji;

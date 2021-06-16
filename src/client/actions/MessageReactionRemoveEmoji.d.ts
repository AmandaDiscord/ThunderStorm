import Action from "./Action";
declare class MessageReactionRemoveEmoji extends Action {
    handle(data: import("@amanda/discordtypings").MessageReactionRemoveEmojiData): {
        reaction: import("../../structures/MessageReaction");
    };
}
export = MessageReactionRemoveEmoji;

import Action from "./Action";
declare class GuildEmojiCreateAction extends Action {
    static readonly default: typeof GuildEmojiCreateAction;
    handle(guild: import("../../structures/Partial/PartialGuild"), createdEmoji: import("../../structures/Emoji")): {
        emoji: import("../../structures/Emoji");
    };
}
export = GuildEmojiCreateAction;

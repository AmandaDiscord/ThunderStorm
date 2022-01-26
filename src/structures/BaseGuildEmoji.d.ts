import Emoji from "./Emoji";
declare abstract class BaseGuildEmoji extends Emoji {
    id: string;
    guild: import("./Guild") | import("./Partial/PartialGuild") | import("./GuildPreview");
    requiresColons: boolean | null;
    managed: boolean | null;
    available: boolean | null;
    _roles: Array<string>;
    static readonly default: typeof BaseGuildEmoji;
    constructor(client: import("../client/Client"), data: import("discord-typings").EmojiData, guild: import("./Guild") | import("./Partial/PartialGuild") | import("./GuildPreview"));
    _patch(data: import("discord-typings").EmojiData): void;
}
export = BaseGuildEmoji;

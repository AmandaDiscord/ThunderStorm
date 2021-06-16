import Emoji from "./Emoji";
declare abstract class BaseGuildEmoji extends Emoji {
    id: string;
    guild: import("./Guild") | import("./Partial/PartialGuild") | import("./GuildPreview");
    requiresColons: boolean | null;
    managed: boolean | null;
    available: boolean | null;
    _roles: Array<string>;
    constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").EmojiData, guild: import("./Guild") | import("./Partial/PartialGuild") | import("./GuildPreview"));
    _patch(data: import("@amanda/discordtypings").EmojiData): void;
}
export = BaseGuildEmoji;

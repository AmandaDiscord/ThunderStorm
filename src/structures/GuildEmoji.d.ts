import { Collection } from "@discordjs/collection";
import BaseGuildEmoji from "./BaseGuildEmoji";
import PartialRole from "./Partial/PartialRole";
declare class GuildEmoji extends BaseGuildEmoji {
    author: import("./User") | null;
    static readonly default: typeof GuildEmoji;
    constructor(client: import("../client/Client"), data: import("discord-typings").EmojiData, guild: import("./Guild") | import("./Partial/PartialGuild"));
    _clone(): this;
    _patch(data: import("discord-typings").EmojiData): void;
    get roles(): Collection<string, PartialRole>;
    fetchAuthor(): Promise<import("./User")>;
    edit(data: import("../Types").GuildEmojiEditData): Promise<this>;
    setName(name: string): Promise<this>;
    delete(): Promise<this>;
    equals(other: GuildEmoji | import("discord-typings").EmojiData): boolean;
}
export = GuildEmoji;

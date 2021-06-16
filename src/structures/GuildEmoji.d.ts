import Collection from "../util/Collection";
import BaseGuildEmoji from "./BaseGuildEmoji";
import PartialRole from "./Partial/PartialRole";
declare class GuildEmoji extends BaseGuildEmoji {
    author: import("./User") | null;
    constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").EmojiData, guild: import("./Guild") | import("./Partial/PartialGuild"));
    _clone(): this;
    _patch(data: import("@amanda/discordtypings").EmojiData): void;
    get roles(): Collection<string, PartialRole>;
    fetchAuthor(): Promise<import("./User")>;
    edit(data: import("../Types").GuildEmojiEditData): Promise<this>;
    setName(name: string): Promise<this>;
    delete(): Promise<this>;
    equals(other: GuildEmoji | import("@amanda/discordtypings").EmojiData): boolean;
}
export = GuildEmoji;

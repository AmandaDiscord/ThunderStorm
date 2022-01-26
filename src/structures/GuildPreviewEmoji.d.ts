import BaseGuildEmoji from "./BaseGuildEmoji";
declare class GuildPreviewEmoji extends BaseGuildEmoji {
    guild: import("./GuildPreview");
    static readonly default: typeof GuildPreviewEmoji;
    get roles(): Set<string>;
}
export = GuildPreviewEmoji;

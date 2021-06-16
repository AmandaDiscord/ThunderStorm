import BaseGuildEmoji from "./BaseGuildEmoji";
declare class GuildPreviewEmoji extends BaseGuildEmoji {
    guild: import("./GuildPreview");
    get roles(): Set<string>;
}
export = GuildPreviewEmoji;

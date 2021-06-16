import GuildChannel from "./GuildChannel";
declare class CategoryChannel extends GuildChannel {
    nsfw: boolean;
    type: "category";
    constructor(guild: import("./Partial/PartialGuild"), data: import("@amanda/discordtypings").CategoryChannelData);
    toJSON(): import("@amanda/discordtypings").CategoryChannelData;
    _patch(data: import("@amanda/discordtypings").CategoryChannelData): void;
}
export = CategoryChannel;

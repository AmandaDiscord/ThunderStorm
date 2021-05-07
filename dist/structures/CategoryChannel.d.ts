import GuildChannel from "./GuildChannel";
declare class CategoryChannel extends GuildChannel {
    nsfw: boolean;
    type: "category";
    constructor(data: import("@amanda/discordtypings").CategoryChannelData, client: import("./Client"));
    toJSON(): import("@amanda/discordtypings").CategoryChannelData;
    _patch(data: import("@amanda/discordtypings").CategoryChannelData): void;
}
export = CategoryChannel;

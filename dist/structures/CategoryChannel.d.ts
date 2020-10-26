import GuildChannel from "./GuildChannel";
declare class CategoryChannel extends GuildChannel {
    nsfw: boolean;
    type: "category";
    constructor(data: import("@amanda/discordtypings").CategoryChannelData, client: import("./Client"));
    toJSON(): {
        id: string;
        name: string;
        guild_id: string;
        parent_id: string | null;
        position: number;
        type: number;
        nsfw: boolean;
    };
}
export = CategoryChannel;

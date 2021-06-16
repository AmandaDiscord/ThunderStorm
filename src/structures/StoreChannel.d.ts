import GuildChannel from "./GuildChannel";
declare class StoreChannel extends GuildChannel {
    nsfw: boolean;
    type: "store";
    constructor(guild: import("./Partial/PartialGuild"), data: import("@amanda/discordtypings").TextChannelData);
    _patch(data: import("@amanda/discordtypings").TextChannelData): void;
}
export = StoreChannel;

import Channel from "./Channel";
declare class GuildChannel extends Channel {
    parentID: string | null;
    position: number;
    guild: import("./Partial/PartialGuild");
    constructor(data: import("@amanda/discordtypings").GuildChannelData, client: import("./Client"));
    toJSON(): {
        id: string;
        name: string;
        guild_id: string;
        parent_id: string | null;
        position: number;
    };
}
export = GuildChannel;

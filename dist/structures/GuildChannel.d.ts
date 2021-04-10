import Channel from "./Channel";
import Collection from "./Util/Collection";
import PermissionOverwrites from "./PermissionOverwrites";
declare class GuildChannel extends Channel {
    parentID: string | null;
    position: number;
    guild: import("./Partial/PartialGuild");
    permissionOverwrites: Collection<string, PermissionOverwrites>;
    constructor(data: import("@amanda/discordtypings").GuildChannelData, client: import("./Client"));
    toJSON(): import("@amanda/discordtypings").GuildChannelData;
}
export = GuildChannel;

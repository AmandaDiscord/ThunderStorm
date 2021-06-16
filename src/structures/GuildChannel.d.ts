import Channel from "./Channel";
import Collection from "../util/Collection";
import PermissionOverwrites from "./PermissionOverwrites";
declare class GuildChannel extends Channel {
    parentID: string | null;
    rawPosition: number;
    guild: import("./Partial/PartialGuild");
    permissionOverwrites: Collection<string, PermissionOverwrites>;
    constructor(guild: import("./Partial/PartialGuild"), data: import("@amanda/discordtypings").GuildChannelData);
    toJSON(): import("@amanda/discordtypings").GuildChannelData;
    _patch(data: import("@amanda/discordtypings").GuildChannelData): void;
}
export = GuildChannel;

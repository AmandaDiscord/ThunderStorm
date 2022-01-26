import Channel from "./Channel";
import { Collection } from "@discordjs/collection";
import PermissionOverwrites from "./PermissionOverwrites";
declare class GuildChannel extends Channel {
    parentId: string | null;
    rawPosition: number;
    guild: import("./Partial/PartialGuild");
    permissionOverwrites: Collection<string, PermissionOverwrites>;
    static readonly default: typeof GuildChannel;
    constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").GuildChannelData);
    toJSON(): import("discord-typings").GuildChannelData & {
        name: string;
    };
    _patch(data: import("discord-typings").GuildChannelData): void;
}
export = GuildChannel;

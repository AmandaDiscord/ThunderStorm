import Permissions from "../util/Permissions";
declare class PermissionOverwrites {
    channel: import("./GuildChannel");
    id: string;
    type: "member" | "role";
    deny: Readonly<Permissions>;
    allow: Readonly<Permissions>;
    static readonly default: typeof PermissionOverwrites;
    constructor(guildChannel: import("./GuildChannel"), data: import("discord-typings").PermissionOverwriteData);
    toJSON(): import("discord-typings").PermissionOverwriteData;
}
export = PermissionOverwrites;

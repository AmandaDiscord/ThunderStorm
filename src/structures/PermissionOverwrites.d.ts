import Permissions from "../util/Permissions";
declare class PermissionOverwrites {
    channel: import("./GuildChannel");
    id: string;
    type: "member" | "role";
    deny: Readonly<Permissions>;
    allow: Readonly<Permissions>;
    constructor(guildChannel: import("./GuildChannel"), data: import("@amanda/discordtypings").PermissionOverwriteData);
    toJSON(): import("@amanda/discordtypings").PermissionOverwriteData;
}
export = PermissionOverwrites;

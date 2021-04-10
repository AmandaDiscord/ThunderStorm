import Collection from "./Util/Collection";
import Permissions from "./Permissions";
declare class Guild {
    client: import("./Client");
    partial: false;
    name: string;
    id: string;
    available: boolean;
    memberCount: number;
    ownerID: string;
    owner: import("./Partial/PartialUser");
    icon: string | null;
    members: Collection<string, import("./GuildMember")>;
    channels: Collection<string, import("./GuildChannel")>;
    permissions: Permissions;
    constructor(data: import("@amanda/discordtypings").GuildData, client: import("./Client"));
    get createdTimestamp(): number;
    get createdAt(): Date;
    get nameAcronym(): string;
    fetch(): Promise<this>;
    iconURL(options?: {
        size: number;
        format: string;
        dynamic: boolean;
    }): string | null;
    toJSON(): {
        name: string;
        id: string;
        unavailable: boolean;
        member_count: number;
        owner_id: string;
        icon: string | null;
        permissions: string;
        members: {
            id: string;
            nick: string | null;
            mute: boolean;
            joined_at: Date;
            premium_since: string | null;
            user: {
                username: string;
                discriminator: string;
                bot: boolean;
                id: string;
                avatar: string | null;
                public_flags: number;
            };
            roles: string[];
            guild_id: string | undefined;
        }[];
        channels: import("@amanda/discordtypings").GuildChannelData[];
    };
    fetchMembers(options: string): Promise<import("./GuildMember") | null>;
    fetchMembers(options: import("../Types").FetchMemberOptions): Promise<Array<import("./GuildMember")> | null>;
}
export = Guild;

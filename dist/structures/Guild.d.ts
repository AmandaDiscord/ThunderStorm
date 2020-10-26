import GuildMember from "./GuildMember";
declare class Guild {
    client: import("./Client");
    partial: false;
    name: string;
    id: string;
    available: boolean;
    memberCount: number;
    ownerID: string;
    owner: import("./Partial/PartialUser");
    region: string;
    icon: string | null;
    members: Map<string, import("./GuildMember")>;
    channels: Map<string, import("./GuildChannel")>;
    constructor(data: import("@amanda/discordtypings").GuildData, client: import("./Client"));
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
        region: string;
        icon: string | null;
        members: {
            id: string;
            nick: string;
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
        channels: {
            id: string;
            name: string;
            guild_id: string;
            parent_id: string | null;
            position: number;
        }[];
    };
    fetchMembers(options: string | {
        ids?: Array<string>;
        query?: string;
        limit?: number;
        after?: string;
    }): Promise<GuildMember | GuildMember[] | null>;
}
export = Guild;

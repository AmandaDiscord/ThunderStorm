declare class GuildMember {
    client: import("./Client");
    partial: false;
    user: import("./User");
    id: string;
    nickname: string | null;
    deaf: boolean;
    mute: boolean;
    joinedAt: Date;
    joinedTimestamp: number;
    premiumSince: string | null;
    roles: Array<string>;
    guild: import("./Partial/PartialGuild") | null;
    constructor(data: import("@amanda/discordtypings").MemberData & {
        user: import("@amanda/discordtypings").UserData;
        guild_id?: string;
    }, client: import("./Client"));
    get displayName(): string;
    get displayTag(): string;
    toString(): string;
    toJSON(): {
        id: string;
        nick: string | null;
        mute: boolean;
        joined_at: string;
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
    };
    send(content: import("../Types").StringResolvable, options?: import("../Types").MessageOptions): Promise<import("./Message")>;
    _patch(data: import("@amanda/discordtypings").MemberData & {
        user: import("@amanda/discordtypings").UserData;
        guild_id?: string;
    }): void;
}
export = GuildMember;

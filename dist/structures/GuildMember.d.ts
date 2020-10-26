declare class GuildMember {
    client: import("./Client");
    partial: false;
    user: import("./User");
    id: string;
    nickname: string;
    deaf: boolean;
    mute: boolean;
    joinedAt: Date;
    premiumSince: string | null;
    roles: Array<string>;
    guild: import("./Partial/PartialGuild") | null;
    constructor(data: import("@amanda/discordtypings").MemberData & {
        user: import("@amanda/discordtypings").UserData;
    }, client: import("./Client"));
    get displayName(): string;
    get displayTag(): string;
    toString(): string;
    toJSON(): {
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
    };
    send(content: import("../types").StringResolvable, options?: import("../types").MessageOptions): Promise<import("./Message")>;
}
export = GuildMember;

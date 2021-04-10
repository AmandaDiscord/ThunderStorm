declare class Invite {
    client: import("./Client");
    guild: import("./Guild");
    code: string;
    presenceCount: number;
    memberCount: number;
    textChannelCount: number;
    voiceChannelCount: number;
    temporary: boolean;
    maxAge: number;
    uses: number;
    maxUses: number;
    inviter: import("./User");
    channel: import("./Partial/PartialChannel");
    createdTimestamp: number;
    constructor(data: any, client: import("./Client"));
    get createdAt(): Date;
    get expiresTimestamp(): number;
    get expiresAt(): Date;
    get url(): string;
    delete(): Promise<this>;
    toString(): string;
    toJSON(): {
        guild: {
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
        code: string;
        approximate_presence_count: number;
        approximate_member_count: number;
        text_channel_count: number;
        voice_channel_count: number;
        temporary: boolean;
        max_age: number;
        max_uses: number;
        inviter: {
            username: string;
            discriminator: string;
            bot: boolean;
            id: string;
            avatar: string | null;
            public_flags: number;
        };
        channel: {
            id: string;
            guild_id: string | null;
            type: number;
        };
        created_at: string;
    };
}
export = Invite;

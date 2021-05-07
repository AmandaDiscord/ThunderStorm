declare class Invite {
    client: import("./Client");
    guild: import("./Partial/PartialGuild") | null;
    code: string;
    presenceCount: number;
    memberCount: number;
    temporary: boolean;
    maxAge: number;
    uses: number;
    maxUses: number;
    inviter: import("./User") | null;
    channel: import("./Partial/PartialChannel");
    createdTimestamp: number;
    targetUserType: 1 | 2 | null;
    targetUser: import("./User") | null;
    constructor(data: import("@amanda/discordtypings").InviteData & {
        guild_id?: string;
        temporay?: boolean;
    }, client: import("./Client"));
    get createdAt(): Date | null;
    get expiresTimestamp(): number | null;
    get expiresAt(): Date | null;
    get url(): string;
    delete(): Promise<this>;
    toString(): string;
    toJSON(): {
        guild?: {
            id: string;
            name: string;
        } | undefined;
        guild_id?: string | undefined;
        code: string;
        approximate_presence_count: number;
        approximate_member_count: number;
        temporary: boolean;
        max_age: number;
        max_uses: number;
        inviter?: import("@amanda/discordtypings").UserData | undefined;
        channel: {
            id: string;
            name: string;
            type: number;
        };
        channel_id: string;
        created_at?: string | undefined;
        expires_at?: string | undefined;
    };
    valueOf(): string;
    _patch(data: import("@amanda/discordtypings").InviteData & {
        channel_id?: string;
        created_at?: string;
        guild_id?: string;
        temporary?: boolean;
        max_age?: number;
        max_uses?: number;
        uses?: number;
    }): void;
}
export = Invite;

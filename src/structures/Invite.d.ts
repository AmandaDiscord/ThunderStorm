declare class Invite {
    static INVITES_PATTERN: RegExp;
    client: import("../client/Client");
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
    private _expiresAt;
    static readonly default: typeof Invite;
    constructor(client: import("../client/Client"), data: import("discord-typings").InviteData & {
        channel_id?: string;
        created_at?: string;
        guild_id?: string;
        temporary?: boolean;
        max_age?: number;
        max_uses?: number;
        uses?: number;
    });
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
        inviter?: import("discord-typings").UserData | undefined;
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
    _patch(data: import("discord-typings").InviteData & {
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

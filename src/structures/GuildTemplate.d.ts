import Base from "./Base";
declare class GuildTemplate extends Base {
    static GUILD_TEMPLATES_PATTERN: RegExp;
    code: string;
    name: string;
    description: string | null;
    usageCount: number;
    creatorId: string;
    creator: import("./User");
    createdAt: Date;
    updatedAt: Date;
    guildId: string;
    serializedGuild: Partial<import("discord-typings").GuildData>;
    unSynced: boolean | null;
    guild: import("./Partial/PartialGuild");
    static readonly default: typeof GuildTemplate;
    constructor(client: import("../client/Client"), data: any);
    _patch(data: any): this;
    createGuild(name: string, icon?: import("../Types").BufferResolvable | import("../Types").Base64Resolvable): Promise<import("./Guild")>;
    edit(options?: {
        name?: string;
        description?: string;
    }): Promise<this>;
    delete(): Promise<this>;
    sync(): Promise<this>;
    get createdTimestamp(): number;
    get updatedTimestamp(): number;
    get url(): string;
    toString(): string;
}
export = GuildTemplate;

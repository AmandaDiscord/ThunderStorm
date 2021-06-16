import Base from "./Base";
declare class GuildTemplate extends Base {
    static GUILD_TEMPLATES_PATTERN: RegExp;
    code: string;
    name: string;
    description: string | null;
    usageCount: number;
    creatorID: string;
    creator: import("./User");
    createdAt: Date;
    updatedAt: Date;
    guildID: string;
    serializedGuild: Partial<import("@amanda/discordtypings").GuildData>;
    unSynced: boolean | null;
    guild: import("./Partial/PartialGuild");
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

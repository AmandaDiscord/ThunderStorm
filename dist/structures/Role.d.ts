declare class Role {
    client: import("./Client");
    name: string;
    id: string;
    color: number;
    managed: boolean;
    hoisted: boolean;
    permissions: number;
    position: number;
    mentionable: boolean;
    guild: import("./Partial//PartialGuild");
    constructor(data: import("@amanda/discordtypings").RoleData & {
        guild_id: string;
    }, client: import("./Client"));
    get createdTimestamp(): number;
    get createdAt(): Date;
    fetch(): Promise<this>;
    toString(): string;
    toJSON(): {
        name: string;
        id: string;
        color: number;
        managed: boolean;
        hoist: boolean;
        permissions: number;
        position: number;
        mentionable: boolean;
        guild_id: string | undefined;
    };
}
export = Role;

declare class Role {
    client: import("../client/Client");
    name: string;
    id: string;
    color: number;
    managed: boolean;
    hoisted: boolean;
    permissions: string;
    position: number;
    mentionable: boolean;
    guild: import("./Partial/PartialGuild");
    partial: false;
    static readonly default: typeof Role;
    constructor(client: import("../client/Client"), data: import("discord-typings").RoleData & {
        guild_id: string;
    });
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
        permissions: string;
        position: number;
        mentionable: boolean;
        guild_id: string | undefined;
    };
}
export = Role;

import Action from "./Action";
declare class GuildRoleCreate extends Action {
    static readonly default: typeof GuildRoleCreate;
    handle(data: {
        guild_id: string;
        role: import("discord-typings").RoleData;
    }): {
        role: import("../../structures/Role");
    };
}
export = GuildRoleCreate;

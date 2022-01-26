import Action from "./Action";
declare class GuildRoleUpdateAction extends Action {
    static readonly default: typeof GuildRoleUpdateAction;
    handle(data: {
        guild_id: string;
        role: import("discord-typings").RoleData;
    }): {
        old: null;
        updated: import("../../structures/Role");
    };
}
export = GuildRoleUpdateAction;

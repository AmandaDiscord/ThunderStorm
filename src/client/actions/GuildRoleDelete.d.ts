import Action from "./Action";
declare class GuildRoleDeleteAction extends Action {
    static readonly default: typeof GuildRoleDeleteAction;
    handle(data: {
        guild_id: string;
        role_id: string;
    }): {
        role: import("../../structures/Partial/PartialRole");
    };
}
export = GuildRoleDeleteAction;

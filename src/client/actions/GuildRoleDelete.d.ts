import Action from "./Action";
declare class GuildRoleDeleteAction extends Action {
    handle(data: {
        guild_id: string;
        role_id: string;
    }): {
        role: import("../../structures/Partial/PartialRole");
    };
}
export = GuildRoleDeleteAction;

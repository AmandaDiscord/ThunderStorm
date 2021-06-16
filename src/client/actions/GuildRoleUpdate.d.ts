import Action from "./Action";
declare class GuildRoleUpdateAction extends Action {
    handle(data: {
        guild_id: string;
        role: import("@amanda/discordtypings").RoleData;
    }): {
        old: null;
        updated: import("../../structures/Role");
    };
}
export = GuildRoleUpdateAction;

import Action from "./Action";
declare class GuildRoleCreate extends Action {
    handle(data: {
        guild_id: string;
        role: import("@amanda/discordtypings").RoleData;
    }): {
        role: import("../../structures/Role");
    };
}
export = GuildRoleCreate;

import Action from "./Action";
declare class GuildUpdateAction extends Action {
    handle(data: import("@amanda/discordtypings").GuildData): {
        old: null;
        updated: import("../../structures/Guild");
    };
}
export = GuildUpdateAction;

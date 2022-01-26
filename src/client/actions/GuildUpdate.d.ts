import Action from "./Action";
declare class GuildUpdateAction extends Action {
    static readonly default: typeof GuildUpdateAction;
    handle(data: import("discord-typings").GuildData): {
        old: null;
        updated: import("../../structures/Guild");
    };
}
export = GuildUpdateAction;

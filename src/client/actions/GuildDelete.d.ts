import Action from "./Action";
declare class GuildDeleteAction extends Action {
    deleted: Map<any, any>;
    static readonly default: typeof GuildDeleteAction;
    constructor(client: import("../Client"));
    handle(data: import("discord-typings").GuildDeleteData): {
        guild: null;
    } | {
        guild: import("../../structures/Partial/PartialGuild");
    };
    scheduleForDeletion(id: string): void;
}
export = GuildDeleteAction;

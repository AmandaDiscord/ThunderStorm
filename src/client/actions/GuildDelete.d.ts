import Action from "./Action";
declare class GuildDeleteAction extends Action {
    deleted: Map<any, any>;
    constructor(client: import("../Client"));
    handle(data: import("@amanda/discordtypings").GuildDeleteData): {
        guild: null;
    } | {
        guild: import("../../structures/Partial/PartialGuild");
    };
    scheduleForDeletion(id: string): void;
}
export = GuildDeleteAction;

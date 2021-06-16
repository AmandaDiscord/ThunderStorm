import Action from "./Action";
declare class GuildBanRemove extends Action {
    handle(data: import("@amanda/discordtypings").GuildBanRemoveData): void;
}
export = GuildBanRemove;

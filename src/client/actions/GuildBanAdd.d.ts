import Action from "./Action";
declare class GuildBanAdd extends Action {
    handle(data: import("@amanda/discordtypings").GuildBanAddData): void;
}
export = GuildBanAdd;

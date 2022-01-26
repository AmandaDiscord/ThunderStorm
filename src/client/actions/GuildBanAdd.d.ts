import Action from "./Action";
declare class GuildBanAdd extends Action {
    static readonly default: typeof GuildBanAdd;
    handle(data: import("discord-typings").GuildBanAddData): void;
}
export = GuildBanAdd;

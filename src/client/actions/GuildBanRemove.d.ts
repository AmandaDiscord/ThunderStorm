import Action from "./Action";
declare class GuildBanRemove extends Action {
    static readonly default: typeof GuildBanRemove;
    handle(data: import("discord-typings").GuildBanRemoveData): void;
}
export = GuildBanRemove;

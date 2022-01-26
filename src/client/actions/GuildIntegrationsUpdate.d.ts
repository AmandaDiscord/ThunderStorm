import Action from "./Action";
declare class GuildIntegrationsUpdate extends Action {
    static readonly default: typeof GuildIntegrationsUpdate;
    handle(data: {
        guild_id: string;
    }): void;
}
export = GuildIntegrationsUpdate;

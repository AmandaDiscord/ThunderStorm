import Action from "./Action";
declare class GuildIntegrationsUpdate extends Action {
    handle(data: {
        guild_id: string;
    }): void;
}
export = GuildIntegrationsUpdate;

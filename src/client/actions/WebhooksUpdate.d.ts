import Action from "./Action";
declare class WebhooksUpdate extends Action {
    static readonly default: typeof WebhooksUpdate;
    handle(data: {
        guild_id: string;
        channel_id: string;
    }): void;
}
export = WebhooksUpdate;

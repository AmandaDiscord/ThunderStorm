import BaseClient from "./BaseClient";
declare class WebhookClient extends BaseClient {
    client: WebhookClient;
    id: string;
    token: string;
    static readonly default: typeof WebhookClient;
    constructor(id: string, token: string, options: import("../Types").ClientOptions);
}
export = WebhookClient;

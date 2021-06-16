import BaseClient from "./BaseClient";
declare class WebhookClient extends BaseClient {
    client: WebhookClient;
    id: string;
    token: string;
    constructor(id: string, token: string, options: import("../Types").ClientOptions);
}
export = WebhookClient;

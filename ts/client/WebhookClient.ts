import BaseClient from "./BaseClient";
import Webhook from "../structures/Webhook";

class WebhookClient extends BaseClient {
	public client: WebhookClient;
	public Id: string;
	public token: string;

	public constructor(Id: string, token: string, options: import("../Types").ClientOptions) {
		super(options);

		this.client = this;
		this.Id = Id;
		this.token = token;
	}
}

Webhook.applyToClass(WebhookClient);

export = WebhookClient;

// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import BaseClient from "./BaseClient";
import Webhook from "../structures/Webhook";

// @ts-ignore
class WebhookClient extends BaseClient {
	public client: WebhookClient;
	public id: string;
	public token: string;

	public static readonly default = WebhookClient;

	public constructor(id: string, token: string, options: import("../Types").ClientOptions) {
		super(options);

		this.client = this;
		this.id = id;
		this.token = token;
	}
}

Webhook.applyToClass(WebhookClient);

export = WebhookClient;

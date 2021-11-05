import Webhook from "./Webhook";

// @ts-ignore
class InteractionWebhook implements Webhook {
	public send!: Webhook["send"];
	public fetchMessage!: Webhook["fetchMessage"];
	public editMessage!: Webhook["editMessage"];
	public deleteMessage!: Webhook["deleteMessage"];
	public url!: Webhook["url"];
	public avatarURL!: Webhook["avatarURL"];
	public avatar!: Webhook["avatar"];
	public name!: Webhook["name"];
	public type!: Webhook["type"];
	public guildId!: Webhook["guildId"];
	public channelId!: Webhook["channelId"];
	public owner!: Webhook["owner"];
	public sourceGuild!: Webhook["sourceGuild"];
	public sourceChannel!: Webhook["sourceChannel"];

	public client: import("../client/Client");
	public Id: string;
	public token: string;

	public constructor(client: import("../client/Client"), Id: string, token: string) {
		this.client = client;
		this.Id = Id;
		this.token = token;
	}
}

Webhook.applyToClass(InteractionWebhook, ["sendSlackMessage", "edit", "delete", "createdTimestamp", "createdAt"]);

export = InteractionWebhook;

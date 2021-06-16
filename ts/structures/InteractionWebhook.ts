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
	public guildID!: Webhook["guildID"];
	public channelID!: Webhook["channelID"];
	public owner!: Webhook["owner"];
	public sourceGuild!: Webhook["sourceGuild"];
	public sourceChannel!: Webhook["sourceChannel"];

	public client: import("../client/Client");
	public id: string;
	public token: string;

	public constructor(client: import("../client/Client"), id: string, token: string) {
		this.client = client;
		this.id = id;
		this.token = token;
	}
}

Webhook.applyToClass(InteractionWebhook, ["sendSlackMessage", "edit", "delete", "createdTimestamp", "createdAt"]);

export = InteractionWebhook;

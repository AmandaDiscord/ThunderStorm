import Endpoints from "snowtransfer/dist/Endpoints";

import MessagePayload from "./MessagePayload";
import Channel from "./Channel";
import { WebhookTypes } from "../util/Constants";
import DataResolver from "../util/DataResolver";
import SnowflakeUtil from "../util/SnowflakeUtil";

class Webhook {
	public client: import("../client/Client");
	public name: string | null = null;
	public token: string | null = null;
	public avatar: string | null = null;
	public id!: string;
	public type!: typeof WebhookTypes[import("@amanda/discordtypings").WebhookData["type"]];
	public guildID!: string;
	public channelID!: string;
	public owner: import("./User") | null = null;
	public sourceGuild: import("./Guild") | null = null;
	public sourceChannel: import("./NewsChannel") | null = null;

	public constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").WebhookData) {
		this.client = client;
		if (data) this._patch(data);
	}

	public _patch(data: import("@amanda/discordtypings").WebhookData) {
		const Guild: typeof import("./Guild") = require("./Guild");
		const NewsChannel: typeof import("./NewsChannel") = require("./NewsChannel");
		const User: typeof import("./User") = require("./User");
		const PartialGuild: typeof import("./Partial/PartialGuild") = require("./Partial/PartialGuild");

		if (data.name !== undefined) this.name = data.name;
		if (data.token !== undefined) this.token = data.token || null;
		if (data.avatar !== undefined) this.avatar = data.avatar;
		if (data.id !== undefined) this.id = data.id;
		if (data.type !== undefined) this.type = WebhookTypes[data.type];
		if (data.guild_id !== undefined) this.guildID = data.guild_id;
		if (data.channel_id !== undefined) this.channelID = data.channel_id;
		if (data.user !== undefined) this.owner = data.user ? new User(this.client, data.user) : null;
		if (data.source_guild !== undefined) this.sourceGuild = data.source_guild ? new Guild(this.client, data.source_guild as any) : null;
		if (data.source_channel !== undefined && ((data.source_guild !== undefined && !!data.source_guild.id) || data.guild_id !== undefined)) {
			const g = new PartialGuild(this.client, { id: data.guild_id || data.source_guild!.id as string });
			this.sourceChannel = data.source_channel ? new NewsChannel(g, data.source_channel as any) : null;
		}
	}

	public async send(options: string | MessagePayload | import("../Types").WebhookMessageOptions): Promise<import("./Message")> {
		let messagePayload: MessagePayload;
		const Message: typeof import("./Message") = require("./Message");
		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");

		if (options instanceof MessagePayload) {
			messagePayload = options.resolveData();
		} else {
			messagePayload = MessagePayload.create(this, options).resolveData();
		}

		const { data, files } = await messagePayload.resolveFiles();
		return this.client._snow.webhook.executeWebhook(this.id, this.token as string, Object.assign({}, data || {}, { files }), { wait: true }).then((d: any) => {
			const channel = new PartialChannel(this.client, { id: d.channel_id, guild_id: d.guild_id, type: "text" });
			return new Message(this.client, d, channel);
		});
	}

	/**
	 * Sends a raw slack message with this webhook.
	 * @param body The raw body to send
	 * @example
	 * // Send a slack message
	 * webhook.sendSlackMessage({
	 * 	"username": "Wumpus",
	 * 	"attachments": [{
	 * 		"pretext": "this looks pretty cool",
	 * 		"color": "#F0F",
	 * 		"footer_icon": "http://snek.s3.amazonaws.com/topSnek.png",
	 * 		"footer": "Powered by sneks",
	 * 		"ts": Date.now() / 1000
	 * 	}]
	 * }).catch(console.error);
	 */
	public async sendSlackMessage(body: any): Promise<boolean> {
		try {
			await this.client._snow.webhook.executeWebhookSlack(this.id, this.token as string, body, { wait: true });
			return true;
		} catch (e) {
			return false;
		}
	}

	public async edit(options: { name?: string; avatar?: import("../Types").BufferResolvable; channel?: import("../Types").ChannelResolvable } = { name: this.name as string }): Promise<Webhook> {
		let avatar;
		let channel;
		if (options.avatar && typeof options.avatar === "string" && !options.avatar.startsWith("data:")) {
			avatar = await DataResolver.resolveImage(options.avatar);
		}
		if (options.channel) channel = options.channel instanceof Channel ? options.channel.id : options.channel;
		const data = await this.client._snow.webhook.updateWebhook(this.id, channel ? undefined : this.token as string, { name: options.name, avatar: avatar as string, channel_id: channel });

		this.name = data.name;
		this.avatar = data.avatar;
		this.channelID = data.channel_id;
		return this;
	}

	public async fetchMessage(message: string | "@original"): Promise<import("./Message")> {
		const Message: typeof import("./Message") = require("./Message");
		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");
		const data = await this.client._snow.webhook.getWebhookMessage(this.id, this.token as string, message);
		const channel = new PartialChannel(this.client, { id: data.channel_id, guild_id: data.guild_id, type: "text" });
		return new Message(this.client, data, channel);
	}

	public async editMessage(message: import("../Types").MessageResolvable | "@original", options: string | MessagePayload | import("../Types").WebhookEditMessageOptions): Promise<import("./Message")> {
		if (!this.token) throw new Error("WEBHOOK_TOKEN_UNAVAILABLE");
		const Message: typeof import("./Message") = require("./Message");
		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");

		let messagePayload;

		if (options instanceof MessagePayload) messagePayload = options;
		else messagePayload = MessagePayload.create(this, options);

		const { data, files } = await messagePayload.resolveData().resolveFiles();

		const d = await this.client._snow.webhook.editWebhookMessage(this.id, this.token as string, typeof message === "string" ? message : message.id, Object.assign({}, data, { files }));
		const channel = new PartialChannel(this.client, { id: d.channel_id, guild_id: d.guild_id, type: "text" });
		return new Message(this.client, d, channel);
	}

	public delete() {
		return this.client._snow.webhook.deleteWebhook(this.id, this.token as string);
	}

	public deleteMessage(message: import("../Types").MessageResolvable | "@original") {
		return this.client._snow.webhook.deleteWebhookMessage(this.id, this.token as string, typeof message === "string" ? message : message.id);
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public get url() {
		return Endpoints.WEBHOOK_TOKEN(this.id, this.token as string);
	}

	public avatarURL({ format, size }: import("../Types").ImageURLOptions = {}): string | null {
		if (!this.avatar) return null;
		return this.client.rest.cdn.Avatar(this.id, this.avatar, format, size);
	}

	static applyToClass(structure: any, ignore: Array<keyof Webhook> = []) {
		for (const prop of [
			"send",
			"sendSlackMessage",
			"fetchMessage",
			"edit",
			"editMessage",
			"delete",
			"deleteMessage",
			"createdTimestamp",
			"createdAt",
			"url"
		] as Array<keyof Webhook>) {
			if (ignore.includes(prop)) continue;
			Object.defineProperty(structure.prototype, prop, Object.getOwnPropertyDescriptor(Webhook.prototype, prop) as PropertyDescriptor);
		}
	}
}

export = Webhook;

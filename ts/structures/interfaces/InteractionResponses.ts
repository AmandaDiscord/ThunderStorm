import { InteractionResponseTypes } from "../../util/Constants";
import MessageFlags from "../../util/MessageFlags";
import MessagePayload from "../MessagePayload";

class InteractionResponses {
	public deferred?: boolean;
	public replied?: boolean;
	public client!: import("../../client/Client");
	public Id!: string;
	public token!: string;
	public webhook!: import("../InteractionWebhook");

	public async defer({ ephemeral }: import("../../Types").InteractionDeferOptions = {}): Promise<void> {
		if (this.deferred || this.replied) throw new Error("INTERACTION_ALREADY_REPLIED");
		await this.client._snow.interaction.createInteractionResponse(this.Id, this.token, {
			type: InteractionResponseTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
			data: {
				flags: ephemeral ? Number(MessageFlags.FLAGS.EPHEMERAL) : undefined
			}
		});
		this.deferred = true;
	}

	public async reply(options: string | MessagePayload | import("../../Types").InteractionReplyOptions): Promise<void> {
		if (this.deferred || this.replied) throw new Error("INTERACTION_ALREADY_REPLIED");

		let messagePayload;
		if (options instanceof MessagePayload) messagePayload = options;
		else messagePayload = MessagePayload.create(this, options);

		const { data, files } = await messagePayload.resolveData().resolveFiles();

		await this.client._snow.interaction.createInteractionResponse(this.Id, this.token, {
			type: InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE,
			data: Object.assign({}, data, { files: files })
		});
		this.replied = true;
	}

	public fetchReply(): Promise<import("../Message")> {
		return this.webhook.fetchMessage("@original");
	}

	public editReply(options: string | MessagePayload | import("../../Types").WebhookEditMessageOptions): Promise<import("../Message")> {
		return this.webhook.editMessage("@original", options);
	}

	public async deleteReply(): Promise<void> {
		await this.webhook.deleteMessage("@original");
	}

	public followUp(options: string | MessagePayload | import("../../Types").InteractionReplyOptions): Promise<import("../Message")> {
		return this.webhook.send(options);
	}

	public async deferUpdate(): Promise<void> {
		if (this.deferred || this.replied) throw new Error("INTERACTION_ALREADY_REPLIED");
		await this.client._snow.interaction.createInteractionResponse(this.Id, this.token, {
			type: InteractionResponseTypes.DEFERRED_MESSAGE_UPDATE
		});
		this.deferred = true;
	}

	public async update(options: string | MessagePayload | import("../../Types").WebhookEditMessageOptions): Promise<void> {
		if (this.deferred || this.replied) throw new Error("INTERACTION_ALREADY_REPLIED");

		let messagePayload;
		if (options instanceof MessagePayload) messagePayload = options;
		else messagePayload = MessagePayload.create(this, options);

		const { data, files } = await messagePayload.resolveData().resolveFiles();

		await this.client._snow.interaction.createInteractionResponse(this.Id, this.token, {
			type: InteractionResponseTypes.UPDATE_MESSAGE,
			data: Object.assign({}, data, { files: files })
		});

		this.replied = true;
	}

	public static applyToClass(structure: any, ignore: Array<string> = []) {
		const props = ["defer", "reply", "fetchReply", "editReply", "deleteReply", "followUp", "deferUpdate", "update"];
		for (const prop of props) {
			if (ignore.includes(prop)) continue;
			Object.defineProperty(
				structure.prototype,
				prop,
				Object.getOwnPropertyDescriptor(InteractionResponses.prototype, prop) as PropertyDescriptor
			);
		}
	}
}

export = InteractionResponses;

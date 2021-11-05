import Interaction from "./Interaction";
import InteractionWebhook from "./InteractionWebhook";
import InteractionResponses from "./interfaces/InteractionResponses";
import { MessageComponentTypes, ChannelTypes } from "../util/Constants";

class MessageComponentInteraction extends Interaction implements InteractionResponses {
	public defer!: InteractionResponses["defer"];
	public reply!: InteractionResponses["reply"];
	public fetchReply!: InteractionResponses["fetchReply"];
	public editReply!: InteractionResponses["editReply"];
	public deleteReply!: InteractionResponses["deleteReply"];
	public followUp!: InteractionResponses["followUp"];
	public deferUpdate!: InteractionResponses["deferUpdate"];
	public update!: InteractionResponses["update"];

	public message: import("./Message") | null;
	public customId: string;
	public componentType: string;
	public deferred: boolean;
	public replied: boolean;
	public webhook: InteractionWebhook;

	public constructor(client: import("../client/Client"), data: import("discord-typings").InteractionData) {
		super(client, data);

		const Message: typeof import("./Message") = require("./Message");
		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");

		this.message = data.message ? new Message(this.client, data.message, this.channel && this.channel.Id === data.message.channel_id ? this.channel : new PartialChannel(this.client, { id: data.message.channel_id, guild_id: data.message.guild_id, type: data.message.guild_id ? ChannelTypes[0] : ChannelTypes[1] })) : null;
		this.customId = data.data?.custom_id || "";
		this.componentType = MessageComponentInteraction.resolveType(data.data?.component_type as Exclude<keyof typeof MessageComponentTypes, string>);
		this.deferred = false;
		this.replied = false;
		this.webhook = new InteractionWebhook(this.client, this.applicationId, this.token);
	}

	public static resolveType(type: import("../Types").MessageComponentType | Exclude<keyof typeof MessageComponentTypes, string>) {
		return typeof type === "string" ? type : MessageComponentTypes[type];
	}
}

InteractionResponses.applyToClass(MessageComponentInteraction);

export = MessageComponentInteraction;

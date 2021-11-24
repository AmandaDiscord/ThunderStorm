// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import BaseCommandInteraction from "./BaseCommandInteraction";
import CommandInteractionOptionResolver from "./CommandInteractionOptionResolver";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from "../util/Constants";

class ContextMenuInteraction extends BaseCommandInteraction {
	public options: import("./CommandInteractionOptionResolver");
	public targetId: string;
	public targetType: import("../Types").ApplicationCommandType;

	public static readonly default = ContextMenuInteraction;

	public constructor(client: import("../client/Client"), data: import("discord-typings").InteractionData) {
		super(client, data);

		this.options = new CommandInteractionOptionResolver(
			this.client,
			this.resolveContextMenuOptions(data.data!),
			this.transformResolved(data.data!.resolved!)
		);

		this.targetId = data.data!.target_id!;

		this.targetType = ApplicationCommandTypes[data.data!.type!];
	}

	private resolveContextMenuOptions({ target_id, resolved }: import("discord-typings").ApplicationCommandInteractionData): Array<import("../Types").CommandInteractionOption> {
		const Message = require("./Message") as typeof import("./Message");
		const result = [] as Array<import("../Types").CommandInteractionOption>;

		if (resolved!.users?.[target_id!]) {
			result.push(
				this.transformOption({ name: "user", type: ApplicationCommandOptionTypes.USER, value: target_id! }, resolved!)
			);
		}

		if (resolved!.messages?.[target_id as string]) {
			result.push({
				name: "message",
				type: "_MESSAGE",
				value: target_id,
				message: new Message(this.client, resolved!.messages[target_id!] as import("discord-typings").MessageData, this.channel!)
			});
		}

		return result;
	}
}

export = ContextMenuInteraction;

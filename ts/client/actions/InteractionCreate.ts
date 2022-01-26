// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import AutocompleteInteraction from "../../structures/AutocompleteInteraction";
import ButtonInteraction from "../../structures/ButtonInteraction";
import CommandInteraction from "../../structures/CommandInteraction";
import ContextMenuInteraction from "../../structures/ContextMenuInteraction";
import SelectMenuInteraction from "../../structures/SelectMenuInteraction";
import { Events, InteractionTypes, MessageComponentTypes, ApplicationCommandTypes } from "../../util/Constants";

class InteractionCreateAction extends Action {
	public static readonly default = InteractionCreateAction;

	handle(data: import("discord-typings").InteractionData) {
		const client = this.client;

		// Resolve and cache partial channels for Interaction#channel getter
		this.getChannel(data);

		let InteractionType: typeof AutocompleteInteraction | typeof ButtonInteraction | typeof CommandInteraction | typeof ContextMenuInteraction | typeof SelectMenuInteraction;
		switch (data.type) {
		case InteractionTypes.APPLICATION_COMMAND:
			switch (data.data!.type) {
			case ApplicationCommandTypes.CHAT_INPUT:
				InteractionType = CommandInteraction;
				break;
			case ApplicationCommandTypes.USER:
			case ApplicationCommandTypes.MESSAGE:
				InteractionType = ContextMenuInteraction;
				break;
			default:
				client.emit(
					Events.DEBUG,
					`[INTERACTION] Received application command interaction with unknown type: ${data.data!.type}`
				);
				return;
			}
			break;
		case InteractionTypes.MESSAGE_COMPONENT:
			switch (data.data!.component_type) {
			case MessageComponentTypes.BUTTON:
				InteractionType = ButtonInteraction;
				break;
			case MessageComponentTypes.SELECT_MENU:
				InteractionType = SelectMenuInteraction;
				break;
			default:
				client.emit(
					Events.DEBUG,
					`[INTERACTION] Received component interaction with unknown type: ${data.data!.component_type}`
				);
				return;
			}
			break;
		case InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE:
			InteractionType = AutocompleteInteraction;
			break;
		default:
			client.emit(Events.DEBUG, `[INTERACTION] Received interaction with unknown type: ${data.type}`);
			return;
		}

		const interaction = new InteractionType(client, data);
		client.emit(Events.INTERACTION_CREATE, interaction);
	}
}

export = InteractionCreateAction;

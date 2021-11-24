// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import CommandInteractionOptionResolver from "./CommandInteractionOptionResolver";
import Interaction from "./Interaction";
import { InteractionResponseTypes, ApplicationCommandOptionTypes } from "../util/Constants";


class AutocompleteInteraction extends Interaction {
	public commandId: string;
	public commandName: string;
	public responded = false;
	public options: CommandInteractionOptionResolver;

	public static readonly default = AutocompleteInteraction;

	public constructor(client: import("../client/Client"), data: import("discord-typings").InteractionData) {
		super(client, data);
		this.commandId = data.data!.id;
		this.commandName = data.data!.name;

		this.options = new CommandInteractionOptionResolver(
			this.client,
			data.data!.options?.map(option => this.transformOption(option)) ?? []
		);
	}

	public get command() {
		const id = this.commandId;
		return this.guild?.commands.cache.get(id) ?? this.client.application!.commands.cache.get(id) ?? null;
	}

	private transformOption(option: import("discord-typings").ApplicationCommandInteractionDataOption) {
		const result: { name: string; type: import("../Types").ApplicationCommandOptionType; value?: string | number; options?: Array<ReturnType<AutocompleteInteraction["transformOption"]>>; focused?: boolean; } = {
			name: option.name,
			type: ApplicationCommandOptionTypes[option.type]
		};

		if ("value" in option) result.value = option.value;
		if ("options" in option) result.options = option.options!.map(opt => this.transformOption(opt));
		if ("focused" in option) result.focused = option.focused;

		return result;
	}

	public async respond(options: Array<import("../Types").ApplicationCommandOptionChoice>) {
		if (this.responded) throw new Error("INTERACTION_ALREADY_REPLIED");

		await this.client.api.interactions(this.id, this.token).callback.post({
			data: {
				type: InteractionResponseTypes.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
				data: {
					choices: options
				}
			}
		});
		this.responded = true;
	}
}

export = AutocompleteInteraction;

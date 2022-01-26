// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import BaseCommandInteraction from "./BaseCommandInteraction";
import CommandInteractionOptionResolver from "./CommandInteractionOptionResolver";

class CommandInteraction extends BaseCommandInteraction {
	public options: CommandInteractionOptionResolver;

	public constructor(client: import("../client/Client"), data: import("discord-typings").InteractionData) {
		super(client, data);

		this.options = new CommandInteractionOptionResolver(
			this.client,
			data.data!.options?.map(option => this.transformOption(option, data.data!.resolved!)) ?? [],
			this.transformResolved(data.data!.resolved ?? {})
		);
	}

	public toString() {
		const properties = [
			this.commandName,
			this.options._group,
			this.options._subcommand,
			...this.options._hoistedOptions.map(o => `${o.name}:${o.value}`)
		];
		return `/${properties.filter(Boolean).join(" ")}`;
	}
}

export = CommandInteraction;

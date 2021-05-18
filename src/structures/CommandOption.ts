import Constants from "../Constants";

import Collection from "./Util/Collection";

class CommandOption {
	public name!: string;
	public type!: typeof Constants.COMMAND_TYPES[keyof typeof Constants.COMMAND_TYPES];
	public options: Collection<string, CommandOption> = new Collection();
	public value: string | number | boolean | null = null;
	public command: import("./InteractionCommand");

	public constructor(command: import("./InteractionCommand"), data: import("@amanda/discordtypings").ApplicationCommandInteractionDataOption) {
		this.command = command;

		this._patch(data);
	}

	public toJSON(): import("@amanda/discordtypings").ApplicationCommandInteractionDataOption {
		return {
			name: this.name,
			// @ts-ignore
			type: Number(Object.keys(Constants.COMMAND_TYPES).find(k => Constants.CHANNEL_TYPES[k] === this.type)),
			value: typeof this.value === "boolean" ? Number(this.value) : this.value || undefined,
			options: [...this.options.values()].map(o => o.toJSON())
		};
	}

	public _patch(data: import("@amanda/discordtypings").ApplicationCommandInteractionDataOption) {
		if (data.name) this.name = data.name;
		if (data.type) this.type = Constants.COMMAND_TYPES[data.type];
		if (data.value !== undefined) {
			if (data.value === 5) this.value = !!data.value;
			else this.value = data.value;
		} else if (data.options) {
			this.options.clear();
			for (const option of data.options) this.options.set(option.name, new CommandOption(this.command, option));
		}
	}
}

export = CommandOption;

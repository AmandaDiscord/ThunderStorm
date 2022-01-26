// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import { TypeError } from "../errors";

class CommandInteractionOptionResolver {
	public client: import("../client/Client");
	public data: ReadonlyArray<ReturnType<import("./BaseCommandInteraction")["transformOption"]>>;
	public readonly resolved: import("../Types").CommandInteractionResolvedData | undefined;

	public _group: string | null = null;
	public _subcommand: string | null = null;
	public _hoistedOptions: Array<ReturnType<import("./BaseCommandInteraction")["transformOption"]>>;

	public static readonly default = CommandInteractionOptionResolver;

	public constructor(client: import("../client/Client"), options: Array<ReturnType<import("./BaseCommandInteraction")["transformOption"]>>, resolved?: import("../Types").CommandInteractionResolvedData) {
		this.client = client;

		this._hoistedOptions = options;

		if (this._hoistedOptions[0]?.type === "SUB_COMMAND_GROUP") {
			this._group = this._hoistedOptions[0].name;
			this._hoistedOptions = this._hoistedOptions[0].options ?? [];
		}
		if (this._hoistedOptions[0]?.type === "SUB_COMMAND") {
			this._subcommand = this._hoistedOptions[0].name;
			this._hoistedOptions = this._hoistedOptions[0].options ?? [];
		}

		this.data = Object.freeze([...options]);
		this.resolved = Object.freeze(resolved);
	}

	public get(name: string, required = false) {
		const option = this._hoistedOptions.find(opt => opt.name === name);
		if (!option) {
			if (required) {
				throw new TypeError("COMMAND_INTERACTION_OPTION_NOT_FOUND", name);
			}
			return null;
		}
		return option;
	}

	private _getTypedOption(name: string, type: import("../Types").ApplicationCommandOptionType | "_MESSAGE", properties: Array<string>, required: boolean) {
		const option = this.get(name, required);
		if (!option) {
			return null;
		} else if (option.type !== type) {
			throw new TypeError("COMMAND_INTERACTION_OPTION_TYPE", name, option.type, type);
		} else if (required && properties.every(prop => option[prop as keyof typeof option] === null || typeof option[prop as keyof typeof option] === "undefined")) {
			throw new TypeError("COMMAND_INTERACTION_OPTION_EMPTY", name, option.type);
		}
		return option;
	}

	public getSubcommand(required = true) {
		if (required && !this._subcommand) {
			throw new TypeError("COMMAND_INTERACTION_OPTION_NO_SUB_COMMAND");
		}
		return this._subcommand;
	}

	public getSubcommandGroup(required = true) {
		if (required && !this._group) {
			throw new TypeError("COMMAND_INTERACTION_OPTION_NO_SUB_COMMAND_GROUP");
		}
		return this._group;
	}

	public getBoolean(name: string, required = false) {
		const option = this._getTypedOption(name, "BOOLEAN", ["value"], required);
		return option?.value === undefined ? null : !!option.value;
	}

	public getChannel(name: string, required = false) {
		const option = this._getTypedOption(name, "CHANNEL", ["channel"], required);
		return option?.channel ?? null;
	}

	public getString(name: string, required = false) {
		const option = this._getTypedOption(name, "STRING", ["value"], required);
		return option?.value as string | undefined ?? null;
	}

	public getInteger(name: string, required = false) {
		const option = this._getTypedOption(name, "INTEGER", ["value"], required);
		return option?.value as number | undefined ?? null;
	}

	public getNumber(name: string, required = false) {
		const option = this._getTypedOption(name, "NUMBER", ["value"], required);
		return option?.value as number | undefined ?? null;
	}

	public getUser(name: string, required = false) {
		const option = this._getTypedOption(name, "USER", ["user"], required);
		return option?.user ?? null;
	}

	public getMember(name: string, required = false) {
		const option = this._getTypedOption(name, "USER", ["member"], required);
		return option?.member ?? null;
	}

	public getRole(name: string, required = false) {
		const option = this._getTypedOption(name, "ROLE", ["role"], required);
		return option?.role ?? null;
	}

	public getMentionable(name: string, required = false) {
		const option = this._getTypedOption(name, "MENTIONABLE", ["user", "member", "role"], required);
		return option?.member ?? option?.user ?? option?.role ?? null;
	}

	public getMessage(name: string, required = false) {
		const option = this._getTypedOption(name, "_MESSAGE", ["message"], required);
		return option?.message ?? null;
	}

	public getFocused(getFull = false) {
		const focusedOption = this._hoistedOptions.find(option => option.focused);
		if (!focusedOption) throw new TypeError("AUTOCOMPLETE_INTERACTION_OPTION_NO_FOCUSED_OPTION");
		return getFull ? focusedOption : focusedOption.value;
	}
}

export = CommandInteractionOptionResolver;

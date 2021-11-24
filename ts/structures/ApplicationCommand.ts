// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Base from "./Base";
import { ApplicationCommandOptionTypes } from "../util/Constants";
import SnowflakeUtil from "../util/SnowflakeUtil";

interface ApplicationCommandConstructor {
	new(client: import("../client/Client"), data: import("discord-typings").ApplicationCommand, guild: import("./Guild") | import("./Partial/PartialGuild")): ApplicationCommand;
	readonly prototype: ApplicationCommand;
	readonly [Symbol.species]: ApplicationCommandConstructor;
}

// @ts-ignore
class ApplicationCommand extends Base {
	public ["constructor"]: typeof ApplicationCommand;
	public static readonly default = ApplicationCommand;
	readonly [Symbol.species]: ApplicationCommandConstructor;

	public guild: import("./Guild") | import("./Partial/PartialGuild") | null;
	public name!: string;
	public description!: string;
	public defaultPermission!: boolean;
	public options!: Array<ReturnType<typeof ApplicationCommand["transformOption"]>>;

	public constructor(client: import("../client/Client"), data: import("discord-typings").ApplicationCommand, guild?: import("./Guild") | import("./Partial/PartialGuild")) {
		super(client);

		this.id = data.id;
		this.guild = guild ?? null;

		this._patch(data);
	}

	public _patch(data: import("discord-typings").ApplicationCommand) {
		this.name = data.name;
		this.description = data.description;
		this.options = data.options?.map(o => this.constructor.transformOption(o, true)) ?? [];
		this.defaultPermission = data.default_permission as boolean;
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public get manager() {
		return (this.guild ?? this.client.application)!.commands;
	}

	public edit(data: import("../Types").ApplicationCommandData): Promise<ApplicationCommand> {
		return this.manager.edit(this, data);
	}

	public delete(): Promise<ApplicationCommand | null> {
		return this.manager.delete(this);
	}

	public fetchPermissions(): Promise<import("../Types").ApplicationCommandPermissions[]> {
		const { Error }: typeof import("../errors") = require("../errors");
		if (!this.guild) throw new Error("GLOBAL_COMMAND_PERMISSIONS");
		return (this.manager as import("../managers/GuildApplicationCommandManager")).fetchPermissions(this);
	}

	public setPermissions(permissions: import("../Types").ApplicationCommandPermissionData[]): Promise<import("../Types").ApplicationCommandPermissions[]> {
		const { Error }: typeof import("../errors") = require("../errors");
		if (!this.guild) throw new Error("GLOBAL_COMMAND_PERMISSIONS");
		return (this.manager as import("../managers/GuildApplicationCommandManager")).setPermissions(this, permissions);
	}

	public static transformOption(option: import("../Types").ApplicationCommandOptionData, received?: boolean): { type: Exclude<keyof typeof import("../util/Constants").ApplicationCommandOptionTypes, string>; name: string; description: string; required?: boolean; choices?: Array<import("../Types").ApplicationCommandOptionChoice>; options?: Array<{ type: Exclude<keyof typeof import("../util/Constants").ApplicationCommandOptionTypes, string>; name: string; description: string; required?: boolean; }> } {
		return {
			type: typeof option.type === "number" && !received ? option.type : ApplicationCommandOptionTypes[option.type] as Exclude<keyof typeof import("../util/Constants").ApplicationCommandOptionTypes, string>,
			name: option.name,
			description: option.description,
			required: option.required,
			choices: option.choices,
			options: option.options?.map(o => this.transformOption(o, received))
		};
	}
}

export = ApplicationCommand;

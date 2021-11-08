import BaseManager from "./BaseManager";
import { TypeError } from "../errors";
import ApplicationCommand from "../structures/ApplicationCommand";
import Collection from "../util/Collection";

import PartialGuild from "../structures/Partial/PartialGuild";

interface ApplicationCommandManagerConstructor {
	new(client: import("../client/Client"), iterable?: IterableIterator<import("../structures/ApplicationCommand")>): ApplicationCommandManager;
	readonly prototype: ApplicationCommandManager;
	readonly [Symbol.species]: ApplicationCommandManagerConstructor;
}

class ApplicationCommandManager extends BaseManager<import("../structures/ApplicationCommand"), Collection<string, import("../structures/ApplicationCommand")>> {
	public ["constructor"]: typeof ApplicationCommandManager;
	public static readonly default: typeof ApplicationCommandManager = ApplicationCommandManager;
	readonly [Symbol.species]: ApplicationCommandManagerConstructor;

	public constructor(client: import("../client/Client"), iterable?: IterableIterator<import("../structures/ApplicationCommand")>) {
		super(client, iterable, ApplicationCommand);
	}

	public _add(data: import("../structures/ApplicationCommand"), cache?: boolean) {
		return super._add(data, cache, { extras: [(this as unknown as import("./GuildApplicationCommandManager")).guild] });
	}

	public get commandPath() {
		let path = this.client.api.applications(this.client.application?.id);
		if ((this as unknown as import("./GuildApplicationCommandManager")).guild) path = path.guilds((this as unknown as import("./GuildApplicationCommandManager")).guild.id);
		return path.commands;
	}

	public async fetch(): Promise<Collection<string, import("../structures/ApplicationCommand")>>;
	public async fetch(id: undefined, cache?: boolean, force?: boolean): Promise<Collection<string, import("../structures/ApplicationCommand")>>;
	public async fetch(id: string, cache?: boolean, force?: boolean): Promise<import("../structures/ApplicationCommand")>;
	public async fetch(id?: string, cache = true, force = false): Promise<Collection<string, import("../structures/ApplicationCommand")> | import("../structures/ApplicationCommand")> {
		if (id) {
			if (!force) {
				const existing = this.cache.get(id);
				if (existing) return existing;
			}
			const command = await this.commandPath(id).get();
			return this._add(command, cache);
		}

		const data = await this.commandPath.get() as Array<import("discord-typings").ApplicationCommand>;
		return data.reduce((coll, command) => coll.set(command.id, this._add(new ApplicationCommand(this.client, command, command.guild_id ? new PartialGuild(this.client, { id: command.guild_id }) : undefined), cache)), new Collection<string, import("../structures/ApplicationCommand")>());
	}

	public async create(command: import("../Types").ApplicationCommandData) {
		const data = await this.commandPath.post({
			data: this.constructor.transformCommand(command)
		});
		return this._add(data);
	}

	public async set(commands: Array<import("../Types").ApplicationCommandData>): Promise<Collection<string, import("../structures/ApplicationCommand")>> {
		const data = await this.commandPath.put({
			data: commands.map(c => this.constructor.transformCommand(c))
		}) as Array<import("discord-typings").ApplicationCommand>;
		return data.reduce((coll, command) => coll.set(command.id, this._add(new ApplicationCommand(this.client, command, command.guild_id ? new PartialGuild(this.client, { id: command.guild_id }) : undefined))), new Collection<string, import("../structures/ApplicationCommand")>());
	}

	public async edit(command: import("../Types").ApplicationCommandResolvable, data: import("../Types").ApplicationCommandData) {
		const id = this.resolveId(command);
		if (!id) throw new TypeError("INVALID_TYPE", "command", "ApplicationCommandResolvable");

		const patched = await this.commandPath(id).patch({ data: this.constructor.transformCommand(data) });
		return this._add(patched);
	}


	public async delete(command: import("../Types").ApplicationCommandResolvable) {
		const id = this.resolveId(command);
		if (!id) throw new TypeError("INVALID_TYPE", "command", "ApplicationCommandResolvable");

		await this.commandPath(id).delete();

		const cached = this.cache.get(id);
		this.cache.delete(id);
		return cached ?? null;
	}

	public static transformCommand(command: import("../Types").ApplicationCommandData) {
		return {
			name: command.name,
			description: command.description,
			options: command.options?.map(o => ApplicationCommand.transformOption(o)),
			default_permission: command.defaultPermission
		};
	}
}

export = ApplicationCommandManager;

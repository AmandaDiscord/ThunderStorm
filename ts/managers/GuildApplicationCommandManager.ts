import ApplicationCommandManager from "./ApplicationCommandManager";
import { TypeError } from "../errors";
import Collection from "../util/Collection";
import { ApplicationCommandPermissionTypes } from "../util/Constants";

interface GuildApplicationCommandManagerConstructor {
	new(guild: import("../structures/Partial/PartialGuild") | import("../structures/Guild"), iterable?: IterableIterator<import("../structures/ApplicationCommand")>): GuildApplicationCommandManager;
	readonly prototype: GuildApplicationCommandManager;
	readonly [Symbol.species]: GuildApplicationCommandManagerConstructor;
}

class GuildApplicationCommandManager extends ApplicationCommandManager {
	// @ts-ignore
	public ["constructor"]: typeof GuildApplicationCommandManager;
	public static readonly default: typeof GuildApplicationCommandManager = GuildApplicationCommandManager;
	// @ts-ignore
	readonly [Symbol.species]: GuildApplicationCommandManagerConstructor;

	public guild: import("../structures/Partial/PartialGuild") | import("../structures/Guild");

	constructor(guild: import("../structures/Partial/PartialGuild") | import("../structures/Guild"), iterable?: IterableIterator<import("../structures/ApplicationCommand")>) {
		super(guild.client, iterable);

		this.guild = guild;
	}

	public async fetchPermissions(): Promise<Collection<string, Array<import("../Types").ApplicationCommandPermissions>>>;
	public async fetchPermissions(command: import("../Types").ApplicationCommandResolvable): Promise<Array<import("../Types").ApplicationCommandPermissions>>
	public async fetchPermissions(command?: import("../Types").ApplicationCommandResolvable): Promise<Array<import("../Types").ApplicationCommandPermissions> | Collection<string, Array<import("../Types").ApplicationCommandPermissions>>> {
		if (command) {
			const id = this.resolveId(command);
			if (!id) throw new TypeError("INVALID_TYPE", "command", "ApplicationCommandResolvable");

			const d = await this.commandPath(id).permissions.get();
			return d.permissions.map((perm: any) => this.constructor.transformPermissions(perm, true));
		}

		const data = await this.commandPath.permissions.get();
		return data.reduce(
			(coll: Collection<string, Array<import("../Types").ApplicationCommandPermissions>>, perm: any) =>
				coll.set(
					perm.Id,
					perm.permissions.map((p: any) => this.constructor.transformPermissions(p, true))
				),
			new Collection()
		);
	}

	public async setPermissions(command: import("../Types").ApplicationCommandResolvable, permissions: Array<import("../Types").ApplicationCommandPermissionData>): Promise<Array<import("../Types").ApplicationCommandPermissions>>;
	public async setPermissions(command: Array<import("../Types").GuildApplicationCommandPermissionData>): Promise<Collection<string, Array<import("../Types").ApplicationCommandPermissions>>>;
	public async setPermissions(command: import("../Types").ApplicationCommandResolvable | Array<import("../Types").GuildApplicationCommandPermissionData>, permissions?: Array<import("../Types").ApplicationCommandPermissionData>): Promise<Array<import("../Types").ApplicationCommandPermissions> | Collection<string, Array<import("../Types").ApplicationCommandPermissions>>> {
		const id = this.resolveId(command as import("../Types").ApplicationCommandResolvable);

		if (id) {
			const data = await this.commandPath(id).permissions.put({
				data: { permissions: (permissions as Array<import("../Types").ApplicationCommandPermissionData>).map(perm => this.constructor.transformPermissions(perm)) }
			});
			return data.permissions.map((perm: any) => this.constructor.transformPermissions(perm, true));
		}

		const data = await this.commandPath.permissions.put({
			data: (command as Array<import("../Types").GuildApplicationCommandPermissionData>).map(perm => ({
				Id: perm.Id,
				permissions: perm.permissions.map(p => this.constructor.transformPermissions(p))
			}))
		});
		return data.reduce(
			(coll: Collection<string, Array<import("../Types").ApplicationCommandPermissions>>, perm: any) =>
				coll.set(
					perm.Id,
					perm.permissions.map((p: any) => this.constructor.transformPermissions(p, true))
				),
			new Collection()
		);
	}

	public static transformPermissions(permissions: import("../Types").ApplicationCommandPermissionData, received?: boolean) {
		return {
			Id: permissions.Id,
			permission: permissions.permission,
			type:
				typeof permissions.type === "number" && !received
					? permissions.type
					: ApplicationCommandPermissionTypes[permissions.type]
		};
	}
}

export = GuildApplicationCommandManager;

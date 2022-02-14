import ApplicationCommandManager from "./ApplicationCommandManager";
import { Collection } from "@discordjs/collection";
interface GuildApplicationCommandManagerConstructor {
    new (guild: import("../structures/Partial/PartialGuild") | import("../structures/Guild"), iterable?: IterableIterator<import("../structures/ApplicationCommand")>): GuildApplicationCommandManager;
    readonly prototype: GuildApplicationCommandManager;
    readonly [Symbol.species]: GuildApplicationCommandManagerConstructor;
}
declare class GuildApplicationCommandManager extends ApplicationCommandManager {
    ["constructor"]: typeof GuildApplicationCommandManager;
    static readonly default: typeof GuildApplicationCommandManager;
    readonly [Symbol.species]: GuildApplicationCommandManagerConstructor;
    guild: import("../structures/Partial/PartialGuild") | import("../structures/Guild");
    constructor(guild: import("../structures/Partial/PartialGuild") | import("../structures/Guild"), iterable?: IterableIterator<import("../structures/ApplicationCommand")>);
    fetchPermissions(): Promise<Collection<string, Array<import("../Types").ApplicationCommandPermissions>>>;
    fetchPermissions(command: import("../Types").ApplicationCommandResolvable): Promise<Array<import("../Types").ApplicationCommandPermissions>>;
    setPermissions(command: import("../Types").ApplicationCommandResolvable, permissions: Array<import("../Types").ApplicationCommandPermissionData>): Promise<Array<import("../Types").ApplicationCommandPermissions>>;
    setPermissions(command: Array<import("../Types").GuildApplicationCommandPermissionData>): Promise<Collection<string, Array<import("../Types").ApplicationCommandPermissions>>>;
    static transformPermissions(permissions: import("../Types").ApplicationCommandPermissionData, received?: boolean): {
        id: string;
        permission: boolean;
        type: 2 | 1 | "USER" | "ROLE";
    };
}
export = GuildApplicationCommandManager;

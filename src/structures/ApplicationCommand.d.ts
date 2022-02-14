import Base from "./Base";
interface ApplicationCommandConstructor {
    new (client: import("../client/Client"), data: import("discord-typings").ApplicationCommand, guild: import("./Guild") | import("./Partial/PartialGuild")): ApplicationCommand;
    readonly prototype: ApplicationCommand;
    readonly [Symbol.species]: ApplicationCommandConstructor;
}
declare class ApplicationCommand extends Base {
    ["constructor"]: typeof ApplicationCommand;
    static readonly default: typeof ApplicationCommand;
    readonly [Symbol.species]: ApplicationCommandConstructor;
    guild: import("./Guild") | import("./Partial/PartialGuild") | null;
    name: string;
    description: string;
    defaultPermission: boolean;
    options: Array<ReturnType<typeof ApplicationCommand["transformOption"]>>;
    constructor(client: import("../client/Client"), data: import("discord-typings").ApplicationCommand, guild?: import("./Guild") | import("./Partial/PartialGuild"));
    _patch(data: import("discord-typings").ApplicationCommand): void;
    get createdTimestamp(): number;
    get createdAt(): Date;
    get manager(): import("../managers/ApplicationCommandManager") | import("../managers/GuildApplicationCommandManager");
    edit(data: import("../Types").ApplicationCommandData): Promise<ApplicationCommand>;
    delete(): Promise<ApplicationCommand | null>;
    fetchPermissions(): Promise<import("../Types").ApplicationCommandPermissions[]>;
    setPermissions(permissions: import("../Types").ApplicationCommandPermissionData[]): Promise<import("../Types").ApplicationCommandPermissions[]>;
    static transformOption(option: import("../Types").ApplicationCommandOptionData, received?: boolean): {
        type: Exclude<keyof typeof import("../util/Constants").ApplicationCommandOptionTypes, string>;
        name: string;
        description: string;
        required?: boolean;
        choices?: Array<import("../Types").ApplicationCommandOptionChoice>;
        options?: Array<{
            type: Exclude<keyof typeof import("../util/Constants").ApplicationCommandOptionTypes, string>;
            name: string;
            description: string;
            required?: boolean;
        }>;
    };
}
export = ApplicationCommand;

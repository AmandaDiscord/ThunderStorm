declare class CommandInteractionOptionResolver {
    client: import("../client/Client");
    data: ReadonlyArray<ReturnType<import("./BaseCommandInteraction")["transformOption"]>>;
    readonly resolved: import("../Types").CommandInteractionResolvedData | undefined;
    _group: string | null;
    _subcommand: string | null;
    _hoistedOptions: Array<ReturnType<import("./BaseCommandInteraction")["transformOption"]>>;
    static readonly default: typeof CommandInteractionOptionResolver;
    constructor(client: import("../client/Client"), options: Array<ReturnType<import("./BaseCommandInteraction")["transformOption"]>>, resolved?: import("../Types").CommandInteractionResolvedData);
    get(name: string, required?: boolean): import("../Types").CommandInteractionOption | null;
    private _getTypedOption;
    getSubcommand(required?: boolean): string | null;
    getSubcommandGroup(required?: boolean): string | null;
    getBoolean(name: string, required?: boolean): boolean | null;
    getChannel(name: string, required?: boolean): import("./Channel") | null;
    getString(name: string, required?: boolean): string | null;
    getInteger(name: string, required?: boolean): number | null;
    getNumber(name: string, required?: boolean): number | null;
    getUser(name: string, required?: boolean): import("./User") | null;
    getMember(name: string, required?: boolean): import("./GuildMember") | null;
    getRole(name: string, required?: boolean): import("./Role") | null;
    getMentionable(name: string, required?: boolean): import("./Role") | import("./User") | import("./GuildMember") | null;
    getMessage(name: string, required?: boolean): import("./Message") | null;
    getFocused(getFull?: boolean): string | number | boolean | import("../Types").CommandInteractionOption | undefined;
}
export = CommandInteractionOptionResolver;

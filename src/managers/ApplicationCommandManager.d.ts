import BaseManager from "./BaseManager";
import ApplicationCommand from "../structures/ApplicationCommand";
import Collection from "../util/Collection";
interface ApplicationCommandManagerConstructor {
    new (client: import("../client/Client"), iterable?: IterableIterator<import("../structures/ApplicationCommand")>): ApplicationCommandManager;
    readonly prototype: ApplicationCommandManager;
    readonly [Symbol.species]: ApplicationCommandManagerConstructor;
}
declare class ApplicationCommandManager extends BaseManager<import("../structures/ApplicationCommand"), Collection<string, import("../structures/ApplicationCommand")>> {
    ["constructor"]: typeof ApplicationCommandManager;
    static readonly default: typeof ApplicationCommandManager;
    readonly [Symbol.species]: ApplicationCommandManagerConstructor;
    constructor(client: import("../client/Client"), iterable?: IterableIterator<import("../structures/ApplicationCommand")>);
    _add(data: import("../structures/ApplicationCommand"), cache?: boolean): ApplicationCommand;
    get commandPath(): any;
    fetch(): Promise<Collection<string, import("../structures/ApplicationCommand")>>;
    fetch(id: undefined, cache?: boolean, force?: boolean): Promise<Collection<string, import("../structures/ApplicationCommand")>>;
    fetch(id: string, cache?: boolean, force?: boolean): Promise<import("../structures/ApplicationCommand")>;
    create(command: import("../Types").ApplicationCommandData): Promise<ApplicationCommand>;
    set(commands: Array<import("../Types").ApplicationCommandData>): Promise<Collection<string, import("../structures/ApplicationCommand")>>;
    edit(command: import("../Types").ApplicationCommandResolvable, data: import("../Types").ApplicationCommandData): Promise<ApplicationCommand>;
    delete(command: import("../Types").ApplicationCommandResolvable): Promise<ApplicationCommand | null>;
    static transformCommand(command: import("../Types").ApplicationCommandData): {
        name: string;
        description: string;
        options: {
            type: 2 | 1 | 9 | 4 | 6 | 5 | 3 | 7 | 8;
            name: string;
            description: string;
            required?: boolean | undefined;
            choices?: import("../Types").ApplicationCommandOptionChoice[] | undefined;
            options?: {
                type: 2 | 1 | 9 | 4 | 6 | 5 | 3 | 7 | 8;
                name: string;
                description: string;
                required?: boolean | undefined;
            }[] | undefined;
        }[] | undefined;
        default_permission: boolean | undefined;
    };
}
export = ApplicationCommandManager;

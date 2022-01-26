import CommandInteractionOptionResolver from "./CommandInteractionOptionResolver";
import Interaction from "./Interaction";
declare class AutocompleteInteraction extends Interaction {
    commandId: string;
    commandName: string;
    responded: boolean;
    options: CommandInteractionOptionResolver;
    static readonly default: typeof AutocompleteInteraction;
    constructor(client: import("../client/Client"), data: import("discord-typings").InteractionData);
    get command(): import("./ApplicationCommand") | null;
    private transformOption;
    respond(options: Array<import("../Types").ApplicationCommandOptionChoice>): Promise<void>;
}
export = AutocompleteInteraction;

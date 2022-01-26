import BaseCommandInteraction from "./BaseCommandInteraction";
import CommandInteractionOptionResolver from "./CommandInteractionOptionResolver";
declare class CommandInteraction extends BaseCommandInteraction {
    options: CommandInteractionOptionResolver;
    constructor(client: import("../client/Client"), data: import("discord-typings").InteractionData);
    toString(): string;
}
export = CommandInteraction;

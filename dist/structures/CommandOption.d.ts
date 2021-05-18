import Constants from "../Constants";
import Collection from "./Util/Collection";
declare class CommandOption {
    name: string;
    type: typeof Constants.COMMAND_TYPES[keyof typeof Constants.COMMAND_TYPES];
    options: Collection<string, CommandOption>;
    value: string | number | boolean | null;
    command: import("./InteractionCommand");
    constructor(command: import("./InteractionCommand"), data: import("@amanda/discordtypings").ApplicationCommandInteractionDataOption);
    toJSON(): import("@amanda/discordtypings").ApplicationCommandInteractionDataOption;
    _patch(data: import("@amanda/discordtypings").ApplicationCommandInteractionDataOption): void;
}
export = CommandOption;

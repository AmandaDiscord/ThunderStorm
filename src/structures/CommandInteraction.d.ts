import Interaction from "./Interaction";
import InteractionWebhook from "./InteractionWebhook";
import InteractionResponses from "./interfaces/InteractionResponses";
import Collection from "../util/Collection";
declare class CommandInteraction extends Interaction implements InteractionResponses {
    defer: InteractionResponses["defer"];
    reply: InteractionResponses["reply"];
    fetchReply: InteractionResponses["fetchReply"];
    editReply: InteractionResponses["editReply"];
    deleteReply: InteractionResponses["deleteReply"];
    followUp: InteractionResponses["followUp"];
    commandID: string;
    commandName: string;
    channel: any;
    deferred: boolean;
    options: Collection<string, import("../Types").CommandInteractionOption>;
    replied: boolean;
    webhook: InteractionWebhook;
    constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").InteractionData);
    get command(): import("./ApplicationCommand") | null;
    transformOption(option: import("@amanda/discordtypings").ApplicationCommandInteractionDataOption, resolved: import("@amanda/discordtypings").ApplicationCommandInteractionDataResolved): import("../Types").CommandInteractionOption;
    _createOptionsCollection(options: Array<import("@amanda/discordtypings").ApplicationCommandInteractionDataOption>, resolved: import("@amanda/discordtypings").ApplicationCommandInteractionDataResolved): Collection<string, import("../Types").CommandInteractionOption>;
}
export = CommandInteraction;

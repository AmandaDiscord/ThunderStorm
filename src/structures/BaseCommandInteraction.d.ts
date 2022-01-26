import Interaction from "./Interaction";
import InteractionWebhook from "./InteractionWebhook";
import InteractionResponses from "./interfaces/InteractionResponses";
declare abstract class BaseCommandInteraction extends Interaction implements InteractionResponses {
    commandId: string;
    commandName: string;
    deferred: boolean;
    replied: boolean;
    ephemeral: boolean | null;
    webhook: InteractionWebhook;
    defer: InteractionResponses["defer"];
    reply: InteractionResponses["reply"];
    fetchReply: InteractionResponses["fetchReply"];
    editReply: InteractionResponses["editReply"];
    deleteReply: InteractionResponses["deleteReply"];
    followUp: InteractionResponses["followUp"];
    static readonly default: typeof BaseCommandInteraction;
    constructor(client: import("../client/Client"), data: import("discord-typings").InteractionData);
    get command(): import("./ApplicationCommand") | null;
    transformResolved({ members, users, channels, roles, messages }: import("discord-typings").ApplicationCommandInteractionDataResolved): import("../Types").CommandInteractionResolvedData;
    transformOption(option: import("discord-typings").ApplicationCommandOptionChoice | import("discord-typings").ApplicationCommandOption | import("discord-typings").ApplicationCommandInteractionDataOption, resolved: import("discord-typings").ApplicationCommandInteractionDataResolved): import("../Types").CommandInteractionOption;
}
export = BaseCommandInteraction;

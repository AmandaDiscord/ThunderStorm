import Interaction from "./Interaction";
import InteractionWebhook from "./InteractionWebhook";
import InteractionResponses from "./interfaces/InteractionResponses";
import { MessageComponentTypes } from "../util/Constants";
declare class MessageComponentInteraction extends Interaction implements InteractionResponses {
    defer: InteractionResponses["defer"];
    reply: InteractionResponses["reply"];
    fetchReply: InteractionResponses["fetchReply"];
    editReply: InteractionResponses["editReply"];
    deleteReply: InteractionResponses["deleteReply"];
    followUp: InteractionResponses["followUp"];
    deferUpdate: InteractionResponses["deferUpdate"];
    update: InteractionResponses["update"];
    message: import("./Message") | null;
    customId: string;
    componentType: string;
    deferred: boolean;
    replied: boolean;
    webhook: InteractionWebhook;
    static readonly default: typeof MessageComponentInteraction;
    constructor(client: import("../client/Client"), data: import("discord-typings").InteractionData);
    static resolveType(type: import("../Types").MessageComponentType | Exclude<keyof typeof MessageComponentTypes, string>): import("../Types").MessageComponentType;
}
export = MessageComponentInteraction;

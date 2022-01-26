import MessageComponentInteraction from "./MessageComponentInteraction";
declare class SelectMenuInteraction extends MessageComponentInteraction {
    values: Array<string>;
    static readonly default: typeof SelectMenuInteraction;
    constructor(client: import("../client/Client"), data: import("discord-typings").InteractionData);
}
export = SelectMenuInteraction;

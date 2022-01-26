import BaseCommandInteraction from "./BaseCommandInteraction";
declare class ContextMenuInteraction extends BaseCommandInteraction {
    options: import("./CommandInteractionOptionResolver");
    targetId: string;
    targetType: import("../Types").ApplicationCommandType;
    static readonly default: typeof ContextMenuInteraction;
    constructor(client: import("../client/Client"), data: import("discord-typings").InteractionData);
    private resolveContextMenuOptions;
}
export = ContextMenuInteraction;

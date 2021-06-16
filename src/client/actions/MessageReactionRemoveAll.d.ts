import Action from "./Action";
declare class MessageReactionRemoveAll extends Action {
    handle(data: import("@amanda/discordtypings").MessageReactionRemoveAllData): {
        message: import("../../structures/Partial/PartialMessage");
    };
}
export = MessageReactionRemoveAll;

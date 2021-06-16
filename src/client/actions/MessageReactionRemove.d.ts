import Action from "./Action";
declare class MessageReactionRemove extends Action {
    handle(data: import("@amanda/discordtypings").MessageReactionRemoveData): false | {
        message: import("../../structures/Message") | import("../../structures/Partial/PartialMessage");
        reaction: import("../../structures/MessageReaction");
        user: import("../../structures/Partial/PartialUser");
    };
}
export = MessageReactionRemove;

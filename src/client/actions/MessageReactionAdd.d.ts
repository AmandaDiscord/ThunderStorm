import Action from "./Action";
declare class MessageReactionAdd extends Action {
    handle(data: import("@amanda/discordtypings").MessageReactionAddData): false | {
        message: import("../../structures/Message") | import("../../structures/Partial/PartialMessage");
        reaction: import("../../structures/MessageReaction");
        user: import("../../structures/Partial/PartialUser");
    };
}
export = MessageReactionAdd;

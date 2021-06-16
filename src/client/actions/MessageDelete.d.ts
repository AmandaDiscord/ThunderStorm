import Action from "./Action";
declare class MessageDeleteAction extends Action {
    handle(data: import("@amanda/discordtypings").MessageDeleteData): {
        message: import("../../structures/Partial/PartialMessage");
    };
}
export = MessageDeleteAction;

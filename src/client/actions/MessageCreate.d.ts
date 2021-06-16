import Action from "./Action";
declare class MessageCreateAction extends Action {
    handle(data: import("@amanda/discordtypings").MessageData): {
        message: import("../../structures/Message");
    };
}
export = MessageCreateAction;

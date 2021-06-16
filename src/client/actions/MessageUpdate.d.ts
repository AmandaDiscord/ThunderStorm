import Action from "./Action";
declare class MessageUpdateAction extends Action {
    handle(data: import("@amanda/discordtypings").MessageData): {
        old: null;
        updated: import("../../structures/Message");
    };
}
export = MessageUpdateAction;

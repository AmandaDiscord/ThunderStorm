import Action from "./Action";
declare class MessageUpdateAction extends Action {
    static readonly default: typeof MessageUpdateAction;
    handle(data: import("discord-typings").MessageData): {
        old: null;
        updated: import("../../structures/Message");
    };
}
export = MessageUpdateAction;

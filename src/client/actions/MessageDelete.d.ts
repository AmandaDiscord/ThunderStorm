import Action from "./Action";
declare class MessageDeleteAction extends Action {
    static readonly default: typeof MessageDeleteAction;
    handle(data: import("discord-typings").MessageDeleteData): {
        message: import("../../structures/Partial/PartialMessage");
    };
}
export = MessageDeleteAction;

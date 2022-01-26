import Action from "./Action";
declare class MessageCreateAction extends Action {
    static readonly default: typeof MessageCreateAction;
    handle(data: import("discord-typings").MessageData): {
        message: import("../../structures/Message");
    };
}
export = MessageCreateAction;

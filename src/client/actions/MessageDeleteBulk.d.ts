import Action from "./Action";
import { Collection } from "@discordjs/collection";
declare class MessageDeleteBulkAction extends Action {
    static readonly default: typeof MessageDeleteBulkAction;
    handle(data: import("discord-typings").MessageBulkDeleteData): {
        messages: Collection<string, import("../../structures/Partial/PartialMessage")>;
    };
}
export = MessageDeleteBulkAction;

import Action from "./Action";
import Collection from "../../util/Collection";
declare class MessageDeleteBulkAction extends Action {
    handle(data: import("@amanda/discordtypings").MessageBulkDeleteData): {
        messages: Collection<string, import("../../structures/Partial/PartialMessage")>;
    };
}
export = MessageDeleteBulkAction;

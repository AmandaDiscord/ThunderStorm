import Action from "./Action";
declare class ChannelDeleteAction extends Action {
    deleted: Map<any, any>;
    constructor(client: import("../Client"));
    handle(data: any): {
        channel: import("../../structures/Partial/PartialChannel");
    };
}
export = ChannelDeleteAction;

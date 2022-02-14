import Action from "./Action";
declare class ChannelUpdateAction extends Action {
    static readonly default: typeof ChannelUpdateAction;
    handle(data: import("../../internal").ChannelDatas): {
        channel: import("../../internal").AnyChannel;
    };
}
export = ChannelUpdateAction;

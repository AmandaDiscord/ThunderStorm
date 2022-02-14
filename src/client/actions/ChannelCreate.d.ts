import Action from "./Action";
declare class ChannelCreateAction extends Action {
    static readonly default: typeof ChannelCreateAction;
    handle(data: import("../../internal").ChannelDatas): {
        channel: import("../../internal").AnyChannel;
    };
}
export = ChannelCreateAction;

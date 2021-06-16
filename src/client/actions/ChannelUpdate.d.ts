import Action from "./Action";
declare class ChannelUpdateAction extends Action {
    handle(data: import("@amanda/discordtypings").ChannelData): {
        channel: import("../../structures/Channel");
    };
}
export = ChannelUpdateAction;

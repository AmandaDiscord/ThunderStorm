import Action from "./Action";
declare class ChannelCreateAction extends Action {
    handle(data: import("@amanda/discordtypings").ChannelData): {
        channel: import("../../structures/Channel");
    };
}
export = ChannelCreateAction;

// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import { Events } from "../../util/Constants";
import Util from "../../util/Util";

class ChannelUpdateAction extends Action {
	public static readonly default = ChannelUpdateAction;

	public handle(data: import("../../internal").ChannelDatas) {
		const channel = Util.createChannelFromData(this.client, data) as import("../../internal").AnyChannel;
		this.client.emit(Events.CHANNEL_UPDATE, channel);
		return { channel };
	}
}

export = ChannelUpdateAction;

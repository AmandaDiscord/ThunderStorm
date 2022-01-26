// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import { Events } from "../../util/Constants";
import Util from "../../util/Util";

class ChannelCreateAction extends Action {
	public static readonly default = ChannelCreateAction;

	public handle(data: import("../../internal").ChannelDatas) {
		const channel = Util.createChannelFromData(this.client, data) as import("../../Types").AnyChannel;
		this.client.emit(Events.CHANNEL_CREATE, channel);
		return { channel };
	}
}

export = ChannelCreateAction;

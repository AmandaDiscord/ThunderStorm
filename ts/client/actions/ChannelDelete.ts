// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import { Events, ChannelTypes } from "../../util/Constants";

class ChannelDeleteAction extends Action {
	public deleted: Map<any, any>;

	public static readonly default = ChannelDeleteAction;

	public constructor(client: import("../Client")) {
		super(client);
		this.deleted = new Map();
	}

	public handle(data: any) {
		const PartialChannel: typeof import("../../structures/Partial/PartialChannel") = require("../../structures/Partial/PartialChannel");

		const channel = new PartialChannel(this.client, { id: data.id, name: data.name, type: ChannelTypes[data.type as import("discord-typings").ChannelType] || "text" });
		this.client.emit(Events.CHANNEL_DELETE, channel);
		return { channel };
	}
}

export = ChannelDeleteAction;

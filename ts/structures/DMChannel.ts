import TextBasedChannel from "./interfaces/TextBasedChannel";

import Channel from "./Channel";
import Collection from "../util/Collection";
import User from "./User";

// @ts-ignore
class DMChannel extends Channel implements TextBasedChannel {
	public readonly lastPinAt!: TextBasedChannel["lastPinAt"];
	public lastPinTimestamp!: TextBasedChannel["lastPinTimestamp"];
	public lastMessageID!: TextBasedChannel["lastMessageID"];
	public readonly lastMessage!: TextBasedChannel["lastMessage"];
	public send!: TextBasedChannel["send"];
	public startTyping!: TextBasedChannel["startTyping"];
	public sendTyping!: TextBasedChannel["sendTyping"];
	public stopTyping!: TextBasedChannel["stopTyping"];
	public readonly typingCount!: TextBasedChannel["typingCount"];
	public readonly typing!: TextBasedChannel["typing"];
	public createMessageCollector!: TextBasedChannel["createMessageCollector"];
	public awaitMessages!: TextBasedChannel["awaitMessages"];
	public createMessageComponentInteractionCollector!: TextBasedChannel["createMessageComponentInteractionCollector"];
	public awaitMessageComponentInteraction!: TextBasedChannel["awaitMessageComponentInteraction"];
	public fetchMessage!: TextBasedChannel["fetchMessage"];
	public fetchMessages!: TextBasedChannel["fetchMessages"];

	public recipient!: User;
	public type: "dm" = "dm";

	public constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").DMChannelData) {
		super(client, Object.assign({}, data, { name: client.user?.username || data.recipients && data.recipients[0] ? data.recipients[0].id : "deleted-channel" }));
	}

	public toJSON() {
		const d: import("@amanda/discordtypings").DMChannelData = Object.assign(super.toJSON(), {
			last_message_id: this.lastMessageID,
			recipients: [this.recipient.toJSON()],
			type: 1 as const
		});
		if (this.lastPinAt) d["last_pin_timestamp"] = this.lastPinAt.toISOString();
		return d;
	}

	public _patch(data: import("@amanda/discordtypings").DMChannelData & { name?: string }) {
		super._patch(data);
		if (data.last_message_id !== undefined) this.lastMessageID = data.last_message_id || null;
		if (data.last_pin_timestamp !== undefined) {
			this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
		}
		if (data.recipients) this.recipient = new User(this.client, data.recipients[0]);
	}
}

TextBasedChannel.applyToClass(DMChannel, true, ["bulkDelete"]);

export = DMChannel;

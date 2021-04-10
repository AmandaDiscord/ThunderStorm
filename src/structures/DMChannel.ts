import TextBasedChannel from "./Interfaces/TextBasedChannel";

import Channel from "./Channel";
import User from "./User";

class DMChannel extends Channel {
	public lastMessageID: string | null;
	public lastPinAt: Date | null;
	public lastPinTimestamp: number | null;
	public recipients: Map<string, import("./User")>;
	public type: "dm";

	public constructor(data: import("@amanda/discordtypings").DMChannelData, client: import("./Client")) {
		data.name = data.recipients ? data.recipients[0].username : "unknown";
		super(data, client);

		this.lastMessageID = data.last_message_id || null;
		this.lastPinAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null;
		this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
		this.recipients = data.recipients ? new Map(data.recipients.map(user => [user.id, new User(user, client)])) : new Map();
		this.type = "dm";
	}

	public toJSON() {
		const d: import("@amanda/discordtypings").DMChannelData = {
			last_message_id: this.lastMessageID,
			recipients: [...this.recipients.values()].map(u => u.toJSON()),
			type: 1 as const,
			...super.toJSON()
		};
		if (this.lastPinAt) d["last_pin_timestamp"] = this.lastPinAt.toISOString();
		return d;
	}

	public send(content: import("../Types").StringResolvable, options: import("../Types").MessageOptions = {}) {
		return TextBasedChannel.send(this, content, options);
	}

	public sendTyping() {
		return TextBasedChannel.sendTyping(this.client, this.id);
	}

	public async deleteMessage(messageID: string, timeout = 0) {
		await TextBasedChannel.deleteMessage(this.client, this.id, messageID, timeout);
	}

	public fetchMessage(messageID: string) {
		return TextBasedChannel.fetchMessage(this.client, this.id, messageID);
	}
}

export = DMChannel;

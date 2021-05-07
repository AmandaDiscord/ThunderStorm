import TextBasedChannel from "./Interfaces/TextBasedChannel";

import Channel from "./Channel";
import Collection from "./Util/Collection";
import User from "./User";

class DMChannel extends Channel {
	public lastMessageID: string | null = null;
	public lastPinAt: Date | null = null;
	public lastPinTimestamp: number | null = null;
	public recipients: Collection<string, import("./User")> = new Collection();
	public type: "dm" = "dm";

	public constructor(data: import("@amanda/discordtypings").DMChannelData, client: import("./Client")) {
		super(Object.assign({}, data, { name: client.user?.username || data.recipients && data.recipients[0] ? data.recipients[0].id : "deleted-channel" }), client);

		if (data.last_message_id !== undefined) this.lastMessageID = data.last_message_id || null;
		if (data.last_pin_timestamp !== undefined) {
			this.lastPinAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null;
			this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
		}
		if (data.recipients) {
			this.recipients.clear();
			for (const recipient of data.recipients) {
				if (recipient.id === this.client.user?.id) this.client.user?._patch(recipient);
				this.recipients.set(recipient.id, recipient.id === this.client.user?.id ? this.client.user : new User(recipient, this.client));
			}
		}
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

	public _patch(data: import("@amanda/discordtypings").DMChannelData & { name?: string }) {
		if (data.last_message_id !== undefined) this.lastMessageID = data.last_message_id || null;
		if (data.last_pin_timestamp !== undefined) {
			this.lastPinAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null;
			this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
		}
		if (data.recipients) {
			this.recipients.clear();
			for (const recipient of data.recipients) {
				if (recipient.id === this.client.user?.id) this.client.user?._patch(recipient);
				this.recipients.set(recipient.id, recipient.id === this.client.user?.id ? this.client.user : new User(recipient, this.client));
			}
		}
		super._patch(data);
	}
}

export = DMChannel;

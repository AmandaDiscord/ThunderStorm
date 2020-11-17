import TextBasedChannel from "./Interfaces/TextBasedChannel";

import GuildChannel from "./GuildChannel";

class TextChannel extends GuildChannel {
	public lastMessageID: string | null;
	public lastPinAt: Date | null;
	public lastPinTimestamp: number | null;
	public nsfw: boolean;
	public rateLimitPerUser: number;
	public topic: string;
	public type: "text";

	public constructor(data: import("@amanda/discordtypings").TextChannelData, client: import("./Client")) {
		super(data, client);

		this.lastMessageID = data.last_message_id || null;
		this.lastPinAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null;
		this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
		this.nsfw = data.nsfw || false;
		this.rateLimitPerUser = data.rate_limit_per_user || 0;
		this.topic = data.topic || "";
		this.type = "text";
	}

	public toJSON() {
		return {
			last_message_id: this.lastMessageID,
			last_pin_timestamp: this.lastPinTimestamp,
			nsfw: this.nsfw,
			rate_limit_per_user: this.rateLimitPerUser,
			topic: this.topic,
			type: 0,
			...super.toJSON()
		};
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

export = TextChannel;

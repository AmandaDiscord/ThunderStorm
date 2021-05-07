import TextBasedChannel from "./Interfaces/TextBasedChannel";

import GuildChannel from "./GuildChannel";

class TextChannel extends GuildChannel {
	public lastMessageID: string | null = null;
	public lastPinAt: Date | null = null;
	public lastPinTimestamp: number | null = null;
	public nsfw = false;
	public rateLimitPerUser = 0;
	public topic = "";
	public type: "text" = "text";

	public constructor(data: import("@amanda/discordtypings").TextChannelData, client: import("./Client")) {
		super(data, client);

		if (!this.lastMessageID || data.last_message_id !== undefined) this.lastMessageID = data.last_message_id || null;
		if (!this.lastPinAt || data.last_pin_timestamp !== undefined) {
			this.lastPinAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null;
			this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
		}
		if (!this.nsfw || data.nsfw !== undefined) this.nsfw = data.nsfw || false;
		if (!this.rateLimitPerUser || data.rate_limit_per_user !== undefined) this.rateLimitPerUser = data.rate_limit_per_user || 0;
		if (!this.topic || data.topic !== undefined) this.topic = data.topic || "";
	}

	public toJSON() {
		const d: import("@amanda/discordtypings").TextChannelData = Object.assign(super.toJSON(), {
			last_message_id: this.lastMessageID,
			nsfw: this.nsfw,
			rate_limit_per_user: this.rateLimitPerUser,
			topic: this.topic,
			type: 0 as const
		});
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

	public async fetchMessage(messageID: string) {
		const data = await TextBasedChannel.fetchMessage(this.client, this.id, messageID);
		if (this.guild) data.guild = this.guild;
		return data;
	}

	public async fetchMessages(options?: import("./Interfaces/TextBasedChannel").FetchMessageOptions) {
		const data = await TextBasedChannel.fetchMessages(this.client, this.id, options);
		if (this.guild) data.forEach(i => i.guild = this.guild);
		return data;
	}

	public _patch(data: import("@amanda/discordtypings").TextChannelData) {
		if (!this.lastMessageID || data.last_message_id !== undefined) this.lastMessageID = data.last_message_id || null;
		if (!this.lastPinAt || data.last_pin_timestamp !== undefined) {
			this.lastPinAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null;
			this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
		}
		if (!this.nsfw || data.nsfw !== undefined) this.nsfw = data.nsfw || false;
		if (!this.rateLimitPerUser || data.rate_limit_per_user !== undefined) this.rateLimitPerUser = data.rate_limit_per_user || 0;
		if (!this.topic || data.topic !== undefined) this.topic = data.topic || "";

		super._patch(data);
	}
}

export = TextChannel;

import TextBasedChannel from "./interfaces/TextBasedChannel";

import GuildChannel from "./GuildChannel";

import Constants from "../util/Constants";

class TextChannel extends GuildChannel implements TextBasedChannel {
	public readonly lastPinAt!: TextBasedChannel["lastPinAt"];
	public lastPinTimestamp!: TextBasedChannel["lastPinTimestamp"];
	public lastMessageId!: TextBasedChannel["lastMessageId"];
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
	public bulkDelete!: TextBasedChannel["bulkDelete"];
	public fetchMessage!: TextBasedChannel["fetchMessage"];
	public fetchMessages!: TextBasedChannel["fetchMessages"];

	public nsfw = false;
	public rateLimitPerUser = 0;
	public topic = "";
	public type: typeof Constants.ChannelTypes[0] = Constants.ChannelTypes[0];

	public constructor(guild: import("./Partial/PartialGuild"), data: import("discord-typings").TextChannelData) {
		super(guild, data);
	}

	public toJSON() {
		const d: import("discord-typings").TextChannelData = Object.assign(super.toJSON(), {
			last_message_id: this.lastMessageId,
			nsfw: this.nsfw,
			rate_limit_per_user: this.rateLimitPerUser,
			topic: this.topic,
			type: 0 as const
		});
		if (this.lastPinAt) d["last_pin_timestamp"] = this.lastPinAt.toISOString();
		return d;
	}

	public _patch(data: import("discord-typings").TextChannelData) {
		super._patch(data);
		if (!this.lastMessageId || data.last_message_id !== undefined) this.lastMessageId = data.last_message_id || null;
		if (!this.lastPinAt || data.last_pin_timestamp !== undefined) {
			this.lastPinTimestamp = this.lastPinAt ? this.lastPinAt.getTime() : null;
		}
		if (!this.nsfw || data.nsfw !== undefined) this.nsfw = data.nsfw || false;
		if (!this.rateLimitPerUser || data.rate_limit_per_user !== undefined) this.rateLimitPerUser = data.rate_limit_per_user || 0;
		if (!this.topic || data.topic !== undefined) this.topic = data.topic || "";
	}
}

TextBasedChannel.applyToClass(TextChannel, true);

export = TextChannel;

import TextBasedChannel from "./Interfaces/TextBasedChannel";

import GuildChannel from "./GuildChannel";

class NewsChannel extends GuildChannel {
	public type: "news"

	public constructor(data: import("@amanda/discordtypings").NewsChannelData, client: import("./Client")) {
		super(data, client);

		this.type = "news";
	}

	public send(content: import("../types").StringResolvable, options: import("../types").MessageOptions = {}) {
		return TextBasedChannel.send(this, content, options);
	}

	public toJSON() {
		return {
			type: 5,
			...super.toJSON()
		};
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

export = NewsChannel;

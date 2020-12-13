import TextBasedChannel from "./Interfaces/TextBasedChannel";

import GuildChannel from "./GuildChannel";

class NewsChannel extends GuildChannel {
	public type: "news"

	public constructor(data: import("@amanda/discordtypings").NewsChannelData, client: import("./Client")) {
		super(data, client);

		this.type = "news";
	}

	public send(content: import("../Types").StringResolvable, options: import("../Types").MessageOptions = {}) {
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
}

export = NewsChannel;

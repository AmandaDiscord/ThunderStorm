import TextBasedChannel from "../Interfaces/TextBasedChannel";

import PartialBase from "./PartialBase";

class PartialThreadChannel extends PartialBase<import("../ThreadTextChannel") | import("../ThreadNewsChannel")> {
	public partialType: "Thread" = "Thread";
	public guild: import("./PartialGuild") | null;
	public parent: import("./PartialChannel");
	public memberCount = 0;

	public constructor(data: import("../../internal").PartialData, client: import("../Client")) {
		super(data, client);

		const PartialGuild: typeof import("./PartialGuild") = require("./PartialGuild");
		const PartialChannel: typeof import("./PartialChannel") = require("./PartialChannel");

		this.guild = new PartialGuild({ id: data.guild_id as string }, client);
		this.parent = new PartialChannel({ id: data.channel_id as string, guild_id: data.guild_id }, client);
		if (data.number) this.memberCount = data.number || 0;
	}

	public toString() {
		return `<#${this.id}>`;
	}

	public toJSON() {
		return {
			guild_id: this.guild?.id || null,
			parent_id: this.parent.id,
			member_count: this.memberCount,
			...super.toJSON()
		};
	}

	public send(content: import("../../Types").StringResolvable, options: import("../../Types").MessageOptions = {}) {
		return TextBasedChannel.send(this, content, options);
	}

	public async deleteMessage(messageID: string, timeout = 0) {
		await TextBasedChannel.deleteMessage(this.client, this.id, messageID, timeout);
	}

	public async fetchMessage(messageID: string) {
		const data = await TextBasedChannel.fetchMessage(this.client, this.id, messageID);
		if (this.guild) data.guild = this.guild;
		return data;
	}

	public async fetchMessages(options?: import("../Interfaces/TextBasedChannel").FetchMessageOptions) {
		const data = await TextBasedChannel.fetchMessages(this.client, this.id, options);
		if (this.guild) data.forEach(i => i.guild = this.guild);
		return data;
	}

	public sendTyping() {
		return TextBasedChannel.sendTyping(this.client, this.id);
	}
}

export = PartialThreadChannel;

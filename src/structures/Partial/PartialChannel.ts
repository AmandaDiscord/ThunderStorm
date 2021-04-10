import TextBasedChannel from "../Interfaces/TextBasedChannel";

import PartialBase from "./PartialBase";
import PartialGuild from "./PartialGuild";

class PartialChannel extends PartialBase<import("../Channel")> {
	public type: "text" | "dm" | "voice" | "unknown";
	public partialType: "Channel";
	public guild: PartialGuild | null;

	public constructor(data: import("../../internal").PartialData, client: import("../Client")) {
		super(data, client);

		this.partialType = "Channel";
		this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, client) : null;
		this.type = data.type || "unknown";
	}

	public toString() {
		return `<#${this.id}>`;
	}

	public toJSON() {
		return {
			guild_id: this.guild ? this.guild.id : null,
			type: this.type === "dm" ? 1 : (this.type === "voice" ? 2 : 0),
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

export = PartialChannel;

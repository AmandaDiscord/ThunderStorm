import TextBasedChannel from "../Interfaces/TextBasedChannel";

import PartialBase from "./PartialBase";
import PartialGuild from "./PartialGuild";

class PartialChannel extends PartialBase<import("../Channel")> {
	public type: string;
	public partialType: "Channel";
	public guild: PartialGuild | null;

	public constructor(data: import("../../internal").PartialData, client: import("../Client")) {
		super(data, client);

		this.partialType = "Channel";
		this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, client) : null;
		this.type = "unknown";
	}

	public toString() {
		return `<#${this.id}>`;
	}

	public toJSON() {
		return {
			guild_id: this.guild ? this.guild.id : null,
			type: this.type,
			...super.toJSON()
		};
	}

	public send(content: import("../../Types").StringResolvable, options: import("../../Types").MessageOptions = {}) {
		return TextBasedChannel.send(this, content, options);
	}

	public async deleteMessage(messageID: string, timeout = 0) {
		await TextBasedChannel.deleteMessage(this.client, this.id, messageID, timeout);
	}

	public fetchMessage(messageID: string) {
		return TextBasedChannel.fetchMessage(this.client, this.id, messageID);
	}

	public sendTyping() {
		return TextBasedChannel.sendTyping(this.client, this.id);
	}
}

export = PartialChannel;

import Constants from "../../Constants";

import TextBasedChannel from "../Interfaces/TextBasedChannel";

import PartialBase from "./PartialBase";

class PartialChannel extends PartialBase<import("../Channel")> {
	public type: typeof Constants.CHANNEL_TYPES[keyof typeof Constants.CHANNEL_TYPES] | "unknown";
	public partialType: "Channel" = "Channel";
	public guild: import("./PartialGuild") | null;
	public name: string;
	public permissions: import("../Permissions");
	public topic: string | null;

	public constructor(data: import("../../internal").PartialData, client: import("../Client")) {
		super(data, client);

		const PartialGuild: typeof import("./PartialGuild") = require("./PartialGuild");
		const Permissions: typeof import("../Permissions") = require("../Permissions");
		this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, client) : null;
		this.type = data.type || "unknown";
		this.name = data.name || "unknown";
		this.permissions = new Permissions(BigInt(data.permissions || 0));
		this.topic = data.topic || null;
	}

	public toString() {
		return `<#${this.id}>`;
	}

	public toJSON() {
		return {
			guild_id: this.guild ? this.guild.id : null,
			// @ts-ignore
			type: Number(Object.keys(Constants.CHANNEL_TYPES).find(k => Constants.CHANNEL_TYPES[k] === this.type) || 0),
			name: this.name,
			permissions: this.permissions.bitfield.toString(),
			...super.toJSON()
		};
	}

	public send(content: import("../../Types").StringResolvable, options: Exclude<import("../../Types").MessageOptions, "suppress"> = {}) {
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

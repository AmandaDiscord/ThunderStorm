import Constants from "../../util/Constants";

import TextBasedChannel from "../interfaces/TextBasedChannel";

import PartialBase from "./PartialBase";

class PartialChannel extends PartialBase<import("../Channel")> implements TextBasedChannel {
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

	public type: import("../../Types").ChannelType;
	public partialType: "Channel" = "Channel";
	public guild: import("./PartialGuild") | null;
	public name: string;
	public permissions: import("../../util/Permissions");
	public topic: string | null;

	public constructor(client: import("../../client/Client"), data: import("../../internal").PartialData) {
		super(client, data);

		const PartialGuild: typeof import("./PartialGuild") = require("./PartialGuild");
		const Permissions: typeof import("../../util/Permissions") = require("../../util/Permissions");
		this.guild = data.guild_id ? new PartialGuild(client, { id: data.guild_id }) : null;
		this.type = data.type || "UNKNOWN";
		this.name = data.name || "UNKNOWN";
		this.permissions = new Permissions(BigInt(data.permissions || 0));
		this.topic = data.topic || null;
	}

	public toString() {
		return `<#${this.Id}>`;
	}

	public toJSON() {
		return {
			guild_id: this.guild ? this.guild.Id : null,
			type: Number(Object.keys(Constants.ChannelTypes).find(k => Constants.ChannelTypes[k as unknown as Exclude<keyof typeof import("../../util/Constants")["ChannelTypes"], string>] === this.type) || 0),
			name: this.name,
			permissions: this.permissions.bitfield.toString(),
			...super.toJSON()
		};
	}
}

TextBasedChannel.applyToClass(PartialChannel, true);

export = PartialChannel;

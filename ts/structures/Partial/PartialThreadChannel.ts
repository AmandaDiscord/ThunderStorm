import TextBasedChannel from "../interfaces/TextBasedChannel";

import PartialBase from "./PartialBase";

import Constants from "../../util/Constants";

// @ts-ignore
class PartialThreadChannel extends PartialBase<import("../ThreadTextChannel") | import("../ThreadNewsChannel")> implements TextBasedChannel {
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
	public type: typeof Constants.ChannelTypes[11] = Constants.ChannelTypes[11];

	public partialType: "Thread" = "Thread";
	public guild: import("./PartialGuild") | null;
	public parent: import("./PartialChannel");
	public memberCount = 0;

	public static readonly default = PartialThreadChannel;

	public constructor(guild: import("./PartialGuild"), data: import("../../internal").PartialData) {
		super(guild.client, data);

		const PartialChannel: typeof import("./PartialChannel") = require("./PartialChannel");

		this.guild = guild;
		this.parent = new PartialChannel(guild.client, { id: data.channel_id as string, guild_id: data.guild_id });
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
}

TextBasedChannel.applyToClass(PartialThreadChannel, true);

export = PartialThreadChannel;

import PartialBase from "./PartialBase";

import Message from "../Message";

class PartialMessage extends PartialBase<import("../Message")> {
	public channel: import("./PartialChannel");
	public guild: import("./PartialGuild") | null;
	public partialType: "Message" = "Message";

	public constructor(data: import("../../internal").PartialData, client: import("../Client")) {
		super(data, client);

		const PartialGuild: typeof import("./PartialGuild") = require("./Partial/PartialGuild");
		const PartialChannel: typeof import("./PartialChannel") = require("./PartialChannel");

		this.channel = new PartialChannel({ id: data.channel_id as string, guild_id: data.guild_id }, client);
		this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, client) : null;
	}

	public async edit(content: import("../../Types").StringResolvable, options: import("../../Types").MessageOptions = {}) {
		const TextBasedChannel: typeof import("../Interfaces/TextBasedChannel") = require("../Interfaces/TextBasedChannel");
		const data = TextBasedChannel.transform(content, options, true);
		const msg = await this.client._snow.channel.editMessage(this.channel.id, this.id, data, { disableEveryone: options.disableEveryone || this.client._snow.options.disableEveryone || false });
		if (this.guild) msg.guild_id = this.guild.id;
		return new Message(msg, this.client);
	}

	/**
	 * @param timeout timeout in ms to delete the Message.
	 */
	public async delete(timeout = 0): Promise<this> {
		const TextBasedChannel: typeof import("../Interfaces/TextBasedChannel") = require("../Interfaces/TextBasedChannel");
		await TextBasedChannel.deleteMessage(this.client, this.channel.id, this.id, timeout);
		return this;
	}

	public async react(emoji: string) {
		if (emoji.match(/^\d+$/)) throw new TypeError("The reaction provided must be in name:id format");
		const ceregex = /<?a?:?(\w+):(\d+)>?/;
		let value;
		const match = emoji.match(ceregex);
		if (match) value = `${match[1]}:${match[2]}`;
		else value = emoji;
		await this.client._snow.channel.createReaction(this.channel.id, this.id, encodeURIComponent(value));
		return this;
	}

	public async clearReactions() {
		await this.client._snow.channel.deleteAllReactions(this.channel.id, this.id);
		return this;
	}

	public toJSON() {
		const value: { channel_id: string; guild_id?: string } = { channel_id: this.channel.id };
		if (this.guild) value["guild_id"] = this.guild.id;
		return Object.assign(super.toJSON(), value);
	}
}

export = PartialMessage;

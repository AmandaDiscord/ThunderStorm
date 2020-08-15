const User = require("./User");
const GuildMember = require("./GuildMember");

class Message {
	/**
	 * @param {import("../typings/internal").MessageData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		this.client = client;
		this.id = data.id;

		const MessageEmbed = require("./MessageEmbed");
		const PartalGuild = require("./Partial/PartialGuild");
		const PartialChannel = require("./Partial/PartialChannel"); // lazy load

		this.channel = new PartialChannel({ id: data.channel_id, guild_id: data.guild_id }, client);
		this.guild = data.guild_id ? new PartalGuild({ id: data.guild_id }, client) : null;
		this.author = data.author ?
									data.author.id === this.client.user.id ? this.client.user : new User(data.author, client)
									: null;
		this.member = data.member && data.author ? new GuildMember({ user: data.author, ...data.member }, client) : null;
		this.attachments = data.attachments;
		this.content = data.content || "";
		this.editedAt = data.edited_timestamp ? new Date(data.edited_timestamp) : null;
		this.editedTimestamp = this.editedAt ? this.editedAt.getTime() : null;
		this.embeds = data.embeds && data.embeds.length > 0 ? data.embeds.map(embed => new MessageEmbed(embed, true)) : [];
		this.flags = data.flags;
		this.createdAt = new Date(data.timestamp);
		this.createdTimestamp = this.createdAt.getTime();
		this.mentions = data.mentions ? data.mentions.map(user => new GuildMember({ user, ...user.member }, client)) : [];
		this.nonce = data.nonce;
		this.pinned = data.pinned;
		this.tts = data.tts;
		this.type = data.type;
		this.system = this.author && this.author.system ? true : false;
	}
	toString() {
		return this.content;
	}
	/**
	 * @param {import("../typings/index").StringResolvable} content
	 * @param {import("../typings/index").MessageOptions} [options]
	 */
	async edit(content, options = {}) {
		const TextBasedChannel = require("./Interfaces/TextBasedChannel");
		const msg = await this.client._snow.channel.editMessage(this.channel.id, this.id, TextBasedChannel.transform(content, options, true), { disableEveryone: options.disableEveryone || this.client._snow.options.disableEveryone || false });
		if (this.guild) msg.guild_id = this.guild.id;
		return new Message(msg, this.client);
	}
	/**
	 * @param {number} [timeout] timeout in ms to delete the Message.
	 * @returns {Promise<this>}
	 */
	async delete(timeout = 0) {
		const value = this;
		return new Promise((res, rej) => {
			const action = async () => {
				await this.client._snow.channel.deleteMessage(this.channel.id, this.id).catch(rej);
				return value;
			}
			if (timeout) {
				setTimeout(async () => {
					return res(action());
				}, timeout);
			} else {
				res(action());
			}
		});
	}
}

module.exports = Message;

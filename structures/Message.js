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
		this.channelID = data.channel_id;
		this.guildID = data.guild_id || null;
		this.author = data.author ? new User(data.author, client) : null;
		this.member = data.member && data.author ? new GuildMember({ user: data.author, ...data.member }, client) : null;
		this.attachments = data.attachments;
		this.content = data.content || "";
		this.editedAt = data.edited_timestamp ? new Date(data.edited_timestamp) : null;
		this.editedTimestamp = this.editedAt ? this.editedAt.getTime() : null;
		this.embeds = data.embeds;
		this.flags = data.flags;
		this.createdAt = new Date(data.timestamp);
		this.createdTimestamp = this.createdAt.getTime();
		this.mentions = data.mentions ? data.mentions.map(user => new GuildMember({ user, ...user.member }, client)) : [];
		this.nonce = data.nonce;
		this.pinned = data.pinned;
		this.tts = data.tts;
		this.type = data.type;
		this.system = this.author.system;
	}
}

module.exports = Message;

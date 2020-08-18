const TextBasedChannel = require("../Interfaces/TextBasedChannel");

const PartialBase = require("./PartialBase");
const PartialGuild = require("./PartialGuild");

const CategoryChannel = require("../CategoryChannel");
const DMChannel = require("../DMChannel");
const NewsChannel = require("../NewsChannel");
const TextChannel = require("../TextChannel");
const VoiceChannel = require("../VoiceChannel");

class PartialChannel extends PartialBase {
	/**
	 * @param {import("../../typings/internal").PartialData} data
	 * @param {import("../../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);

		/** @type {"Channel"} */
		this.partialType = "Channel";
		/** @type {?PartialGuild} */
		this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, client) : null;
		this.type = "unkown";
	}
	toString() {
		return `<#${this.id}>`;
	}
	toJSON() {
		return {
			/** @type {?string} */
			guild_id: this.guild ? this.guild.id : null,
			...super.toJSON()
		}
	}
	/**
	 * @param {import("../../typings/index").StringResolvable} content
	 * @param {import("../../typings/index").MessageOptions} [options]
	 */
	send(content, options = {}) {
		return TextBasedChannel.send(this, content, options);
	}
	/**
	 * @param {string} messageID
	 * @param {number} [timeout]
	 */
	async deleteMessage(messageID, timeout = 0) {
		await TextBasedChannel.deleteMessage(this.client, this.id, messageID, timeout);
	}
	/**
	 * @param {string} messageID
	 */
	fetchMessage(messageID) {
		return TextBasedChannel.fetchMessage(this.client, this.id, messageID);
	}
	sendTyping() {
		return TextBasedChannel.sendTyping(this.client, this.id);
	}
	/**
	 * @returns {Promise<CategoryChannel | DMChannel | NewsChannel | TextChannel | VoiceChannel>}
	 */
	fetch() {
		// @ts-ignore
		return super.fetch();
	}
}

module.exports = PartialChannel;

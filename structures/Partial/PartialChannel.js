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
		this.type = "Channel";
		this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, client) : null;
	}
	toString() {
		return `<#${this.id}>`;
	}
	/**
	 * @param {import("../../typings/index").StringResolvable} content
	 * @param {import("../../typings/index").MessageOptions} [options]
	 */
	send(content, options = {}) {
		return TextBasedChannel.send(this, content, options);
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

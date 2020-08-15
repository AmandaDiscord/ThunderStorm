const CategoryChannel = require("../CategoryChannel");
const DMChannel = require("../DMChannel");
const Guild = require("../Guild");
const NewsChannel = require("../NewsChannel");
const TextChannel = require("../TextChannel");
const User = require("../User");
const VoiceChannel = require("../VoiceChannel");

class PartialBase {
	/**
	 * @param {import("../../typings/internal").PartialData} data
	 * @param {import("../../typings/index").Client} client
	 */
	constructor(data, client) {
		this.client = client;
		this.partial = true;
		/**
		 * @type {"User" | "Channel" | "Guild" | "Base"}
		 */
		this.type = "Base";

		this.id = data.id;
	}
	async fetch() {
		let data;

		if (this.type === "Channel") {
			const channeldata = await this.client._snow.channel.getChannel(this.id);
			if (channeldata.type === 0) data = new TextChannel(channeldata, this.client);
			else if (channeldata.type === 1) data = new DMChannel(channeldata, this.client);
			else if (channeldata.type === 2) data = new VoiceChannel(channeldata, this.client);
			else if (channeldata.type === 4) data = new CategoryChannel(channeldata, this.client);
			else if (channeldata.type === 5) data = new NewsChannel(channeldata, this.client);
			else data = channeldata;
		} else if (this.type === "Guild") {
			const guilddata = await this.client._snow.guild.getGuild(this.id);
			data = new Guild(guilddata, this.client);
		} else if (this.type === "User") {
			const userdata = await this.client._snow.user.getUser(this.id);
			data = new User(userdata, this.client);
		}

		return data;
	}
}

module.exports = PartialBase;

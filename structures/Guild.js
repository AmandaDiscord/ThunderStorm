const GuildMember = require("./GuildMember");
const CategoryChannel = require("./CategoryChannel");
const NewsChannel = require("./NewsChannel");
const TextChannel = require("./TextChannel");
const VoiceChannel = require("./VoiceChannel");

class Guild {
	/**
	 * @param {import("../typings/internal").GuildData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		this.client = client;

		this.members = new Map(data.members.map(member => [member.user.id, new GuildMember(member, client)]));
		this.channels = new Map(data.channels.map(channel => {
			let chan;
			if (channel.type === 0) chan = new TextChannel(channel, client);
			else if (channel.type === 2) chan = new VoiceChannel(channel, client);
			else if (channel.type === 4) chan = new CategoryChannel(channel, client);
			else if (channel.type === 5) chan = new NewsChannel(channel, client);
			return [channel.id, chan];
		}));

	}
}

module.exports = Guild;

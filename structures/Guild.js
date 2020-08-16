const GuildMember = require("./GuildMember");
const CategoryChannel = require("./CategoryChannel");
const NewsChannel = require("./NewsChannel");
const TextChannel = require("./TextChannel");
const VoiceChannel = require("./VoiceChannel");

class Guild {
	/**
	 * @param {import("@amanda/discordtypings").GuildData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		this.client = client;
		/** @type {false} */
		this.partial = false;

		const PartialUser = require("./Partial/PartialUser"); // lazy load

		this.name = data.name;
		this.id = data.id;
		this.available = !data.unavailable;
		this.memberCount = data.member_count || 0;
		this.ownerID = data.owner_id;
		this.owner = new PartialUser({ id: data.owner_id }, client);

		this.members = data.members ? new Map(data.members.map(member => [member.user.id, new GuildMember(member, client)])) : new Map();
		this.channels = data.channels? new Map(data.channels.map(channel => {
			let chan;
			if (channel.type === 0) chan = new TextChannel(channel, client);
			else if (channel.type === 2) chan = new VoiceChannel(channel, client);
			else if (channel.type === 4) chan = new CategoryChannel(channel, client);
			else if (channel.type === 5) chan = new NewsChannel(channel, client);
			return [channel.id, chan];
		})) : new Map();
	}
}

module.exports = Guild;

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
		this.region = data.region;

		/**
		 * @type {Map<string, GuildMember>}
		 */
		this.members = data.members && Array.isArray(data.members) ? new Map(data.members.map(member => [member.user.id, new GuildMember(member, client)])) : new Map();
		/**
		 * @type {Map<string, import("../typings/index").GuildChannel>}
		 */
		this.channels = data.channels? new Map(data.channels.map(channel => {
			let chan;
			if (channel.type === 0) chan = new TextChannel(channel, client);
			else if (channel.type === 2) chan = new VoiceChannel(channel, client);
			else if (channel.type === 4) chan = new CategoryChannel(channel, client);
			else if (channel.type === 5) chan = new NewsChannel(channel, client);
			return [channel.id, chan];
		})) : new Map();
	}
	toJSON() {
		return {
			name: this.name,
			id: this.id,
			unavailable: !this.available,
			member_count: this.memberCount,
			owner_id: this.ownerID,
			region: this.region,
			members: [...this.members.values()].map(mem => mem.toJSON()),
			channels: [...this.channels.values()].map(chan => chan.toJSON())
		}
	}
	/**
	 * @param {string | { ids?: Array<string>, query?: string, limit?: number, after?: string }} options
	 */
	async fetchMembers(options) {
		// @ts-ignore
		if (typeof options === "string") return this.client._snow.guild.getGuildMember(this.id, options).then(d => new GuildMember(d, this.client));
		else {
			const payload = {};
			if (options.limit) payload["limit"] = options.limit;
			if (options.after) payload["after"] = options.after;
			const data = await this.client._snow.guild.getGuildMembers(this.id, payload);
			if (!data || data.length === 0) return null;
			// @ts-ignore
			if (!options.query) return data.map(d => new GuildMember(d, this.client));
			// @ts-ignore
			else if (options.ids) return data.filter(d => (d.user ? options.ids.includes(d.user.id) : false)).map(d => new GuildMember(d, this.client));
			// @ts-ignore
			else return data.filter(d => d.nick.includes(options.query) || (d.user ? d.user.username.includes(options.query) : false) || (d.user ? d.user.id.includes(options.query) : false) || (d.user ? `${d.user.username}#${d.user.discriminator}` === options.query : false)).map(d => new GuildMember(d, this.client));
		}
	}
}

module.exports = Guild;

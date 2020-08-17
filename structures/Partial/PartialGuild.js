const PartialBase = require("./PartialBase");

const Guild = require("../Guild");

class PartialGuild extends PartialBase {
	/**
	 * @param {import("../../typings/internal").PartialData} data
	 * @param {import("../../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);

		/** @type {"Guild"} */
		this.partialType = "Guild";
		this.memberCount = data.number || 0;
	}
	/**
	 * @returns {Promise<Guild>}
	 */
	fetch() {
		// @ts-ignore
		return super.fetch();
	}
	/**
	 * @param {string | { ids?: Array<string>, query?: string, limit?: number, after?: string }} options
	 */
	async fetchMembers(options) {
		const GuildMember = require("../GuildMember")
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

module.exports = PartialGuild;

const PartialBase = require("./PartialBase");
const PartialGuild = require("./PartialGuild");

class PartialRole extends PartialBase {
	/**
	 * @param {import("../../typings/internal").PartialData} data
	 * @param {import("../../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);

		/** @type {"Role"} */
		this.partialType = "Role";

		this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, this.client) : null;
	}
	toString() {
		return `<@&${this.id}>`
	}
	/** @returns {Promise<import("../Role")>} */
	fetch() {
		// @ts-ignore
		return super.fetch()
	}
}

module.exports = PartialRole;

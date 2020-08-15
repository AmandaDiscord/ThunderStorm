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
		this.type = "Guild";
		this.memberCount = data.number || 0;
	}
	/**
	 * @returns {Promise<Guild>}
	 */
	fetch() {
		return super.fetch();
	}
}

module.exports = PartialGuild;
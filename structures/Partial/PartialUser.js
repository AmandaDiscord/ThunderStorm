const TextBasedChannel = require("../Interfaces/TextBasedChannel");

const PartialBase = require("./PartialBase");

const User = require("../User");

class PartialUser extends PartialBase {
	/**
	 * @param {import("../../typings/internal").PartialData} data
	 * @param {import("../../typings/index").Client} client
	 */
	constructor(data, client) {
		super(data, client);

		/** @type {"User"} */
		this.type = "User";
	}
	toString() {
		return `<@${this.id}>`;
	}
	/**
	 * @param {import("../../typings/index").StringResolvable} content
	 * @param {import("../../typings/index").MessageOptions} [options]
	 */
	send(content, options = {}) {
		return TextBasedChannel.send(this, content, options);
	}
	/**
	 * @returns {Promise<User>}
	 */
	fetch() {
		// @ts-ignore
		return super.fetch();
	}
}

module.exports = PartialUser;

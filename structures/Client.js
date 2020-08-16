const EventEmitter = require("events").EventEmitter;

class Client extends EventEmitter {
	/**
	 * @param {import("../typings/index").ClientOptions} options
	 */
	constructor(options) {
		super();

		/** @type {import("./ClientUser")} */
		this.user = null;
		this.token = options.snowtransfer.token;

		/**
		 * @type {Map<string, import("./Partial/PartialGuild")>}
		 */
		this.guilds = new Map();

		this._snow = options.snowtransfer;
	}
	toString() {
		return this.user ? `<@${this.user.id}>` : "Client";
	}
	/**
	 * @param {string} userID
	 */
	fetchUser(userID) {
		const User = require("./User");
		// @ts-ignore
		return this._snow.user.getUser(userID).then(user => new User(user, this));
	}
}

module.exports = Client;

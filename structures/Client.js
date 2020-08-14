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

		this._snow = options.snowtransfer;
	}
}

module.exports = Client;

const EventEmitter = require("events").EventEmitter;

const VoiceRegion = require("./VoiceRegion");

class Client extends EventEmitter {
	/**
	 * @param {import("../typings/index").ClientOptions} options
	 */
	constructor(options) {
		super();

		this.options = options;
		this.readyTimestamp = null;
		this.token = options.snowtransfer.token.match(/B?o?t? ?([\w\d\._]+)/)[1];
		/** @type {import("./ClientUser")} */
		this.user = null;

		this._snow = options.snowtransfer;
	}
	get readyAt() {
		return this.readyTimestamp ? new Date(this.readyTimestamp) : null;
	}
	get uptime() {
		return this.readyTimestamp ? Date.now() - this.readyTimestamp : 0;
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
	/**
	 * @param {string} id
	 */
	async fetchInvite(id) {
		const Invite = require("./Invite");
		const match = id.match(/h?t?t?p?s?:?\/?\/?d?i?s?c?o?r?d?\.?g?g?\/?([\w\d]+)/);
		let code;
		if (match && match[1]) code = match[1];
		if (!code) return null;
		const data = await this._snow.invite.getInvite(code, true);
		// @ts-ignore
		return new Invite(data, this);
	}
	async fetchVoiceRegions() {
		const data = await this._snow.voice.getVoiceRegions();
		return new Map(data.map(item => [item.id, new VoiceRegion(item)]));
	}
}

module.exports = Client;

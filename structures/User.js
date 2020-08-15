const TextBasedChannel = require("./Interfaces/TextBasedChannel");

const Constants = require("../constants");

class User {
	/**
	 * @param {import("../typings/internal").UserData} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		this.client = client;
		/** @type {false} */
		this.partial = false;

		this.username = data.username;
		this.discriminator = data.discriminator;
		this.bot = data.bot || false;
		this.id = data.id;
		this.avatar = data.avatar || null;
		this.flags = data.public_flags;
		this.system = data.system || false;
	}
	get tag() {
		return `${this.username}#${this.discriminator}`;
	}
	get defaultAvatarURL() {
		return `${Constants.BASE_CDN_URL}/embed/avatars/${Number(this.discriminator) % 5}.png`;
	}
	toString() {
		return `<@${this.id}>`;
	}
	avatarURL(options = { size: 128, format: "png", dynamic: true }) {
		if (!this.avatar) return null;
		let format = this.avatar.startsWith("a_") && options.dynamic ? "gif" : options.format;
		return `${Constants.BASE_CDN_URL}/avatars/${this.id}/${this.avatar}.${format}${!["gif", "webp"].includes(format) ? `?size=${options.size}` : ""}`;
	}
	displayAvatarURL(options = { size: 128, format: "png", dynamic: true }) {
		if (!this.avatar) return this.defaultAvatarURL;
		else return this.avatarURL(options);
	}
	/**
	 * @param {import("../typings/index").StringResolvable} content
	 * @param {import("../typings/index").MessageOptions} [options]
	 */
	send(content, options = {}) {
		return TextBasedChannel.send(this, content, options);
	}
}

module.exports = User;

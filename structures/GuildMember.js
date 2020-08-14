const User = require("./User");

class GuildMember {
	/**
	 * @param {import("../typings/internal").MemberData & { user: import("../typings/internal").UserData }} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		this.client = client;

		this.user = new User(data.user, client);
		this.id = data.user.id;
		this.nickname = data.nick;
		this.deaf = data.deaf;
		this.mute = data.mute;
		this.joinedAt = new Date(data.joined_at);
		this.premiumSince = data.premium_since || null;
	}
	get displayName() {
		return this.nickname || this.user.username
	}
}

module.exports = GuildMember;

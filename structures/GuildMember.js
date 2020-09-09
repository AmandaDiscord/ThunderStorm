const TextBasedChannel = require("./Interfaces/TextBasedChannel");

const User = require("./User");

class GuildMember {
	/**
	 * @param {import("@amanda/discordtypings").MemberData & { user: import("@amanda/discordtypings").UserData }} data
	 * @param {import("../typings/index").Client} client
	 */
	constructor(data, client) {
		const PartialGuild = require("./Partial/PartialGuild");

		this.client = client;
		/** @type {false} */
		this.partial = false;

		this.user = new User(data.user, client);
		this.id = data.user.id;
		this.nickname = data.nick;
		this.deaf = data.deaf || false;
		this.mute = data.mute || false;
		this.joinedAt = new Date(data.joined_at);
		this.premiumSince = data.premium_since || null;
		this.roles = data.roles || [];

		// @ts-ignore
		this.guild = data.guild_id ? new PartialGuild({ id: data.guild_id }, this.client) : null;
	}
	get displayName() {
		return this.nickname || this.user.username
	}
	/**
	 * A combination of the member's tag and nickname
	 * - Nickname set:   PapiOphidian#0110 (Async)
	 * - Nickname unset: PapiOphidian#0110
	 * @type {String}
	 * @readonly
	 */
	get displayTag() {
		return this.nickname ? `${this.user.tag} (${this.nickname})` : this.user.tag;
	}
	toString() {
		return `<@${this.id}>`;
	}
	toJSON() {
		return {
			id: this.id,
			nick: this.nickname,
			mute: this.mute,
			joined_at: this.joinedAt,
			premium_since: this.premiumSince,
			user: this.user.toJSON(),
			roles: this.roles,
			guild_id: this.guild ? this.guild.id : undefined
		}
	}
	/**
	 * @param {import("../typings/index").StringResolvable} content
	 * @param {import("../typings/index").MessageOptions} [options]
	 */
	send(content, options = {}) {
		return TextBasedChannel.send(this, content, options);
	}
}

module.exports = GuildMember;

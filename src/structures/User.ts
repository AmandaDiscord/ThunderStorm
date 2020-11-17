import TextBasedChannel from "./Interfaces/TextBasedChannel";

import Constants from "../Constants";

import { SnowflakeUtil } from "./Util/Util";

class User {
	public client: import("./Client");
	public partial: false;
	public username: string;
	public discriminator: string;
	public bot: boolean;
	public id: string;
	public avatar: string | null;
	public flags: number;
	public system: boolean;

	public constructor(data: import("@amanda/discordtypings").UserData, client: import("./Client")) {
		this.client = client;
		this.partial = false;

		this.username = data.username;
		this.discriminator = data.discriminator;
		this.bot = data.bot || false;
		this.id = data.id;
		this.avatar = data.avatar || null;
		this.flags = data.public_flags || 0;
		this.system = data.system || false;
	}

	public get tag() {
		return `${this.username}#${this.discriminator}`;
	}

	public get defaultAvatarURL() {
		return `${Constants.BASE_CDN_URL}/embed/avatars/${Number(this.discriminator) % 5}.png`;
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public toString() {
		return `<@${this.id}>`;
	}

	public toJSON() {
		return {
			username: this.username,
			discriminator: this.discriminator,
			bot: this.bot,
			id: this.id,
			avatar: this.avatar,
			public_flags: this.flags
		};
	}

	public avatarURL(options = { size: 128, format: "png", dynamic: true }) {
		if (!this.avatar) return null;
		const format = this.avatar.startsWith("a_") && options.dynamic ? "gif" : options.format;
		return `${Constants.BASE_CDN_URL}/avatars/${this.id}/${this.avatar}.${format}${!["gif", "webp"].includes(format) ? `?size=${options.size}` : ""}`;
	}

	public displayAvatarURL(options = { size: 128, format: "png", dynamic: true }) {
		if (!this.avatar) return this.defaultAvatarURL;
		else return this.avatarURL(options);
	}

	public fetch() {
		return Promise.resolve(this);
	}

	public send(content: import("../Types").StringResolvable, options: import("../Types").MessageOptions = {}) {
		return TextBasedChannel.send(this, content, options);
	}
}

export = User;

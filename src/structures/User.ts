import Constants from "../Constants";

import TextBasedChannel from "./Interfaces/TextBasedChannel";

import Base from "./Base";
import UserFlags from "./UserFlags";
class User extends Base {
	public partial: false = false;
	public username!: string;
	public discriminator!: string;
	public bot!: boolean;
	public id!: string;
	public avatar!: string | null;
	public flags!: Readonly<UserFlags>;
	public system!: boolean;

	public constructor(data: import("@amanda/discordtypings").UserData, client: import("./Client")) {
		super(data, client);

		if (data.username) this.username = data.username;
		if (data.discriminator) this.discriminator = data.discriminator;
		if (!this.bot || data.bot !== undefined) this.bot = data.bot || false;
		if (data.id) this.id = data.id;
		if (!this.avatar) this.avatar = data.avatar || null;
		if (!this.flags || data.public_flags) this.flags = new UserFlags(data.public_flags || 0).freeze();
		if (!this.system || data.system !== undefined) this.system = data.system || false;
	}

	public get tag() {
		return `${this.username}#${this.discriminator}`;
	}

	public get defaultAvatarURL() {
		return `${Constants.BASE_CDN_URL}/embed/avatars/${Number(this.discriminator) % 5}.png`;
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
			public_flags: Number(this.flags.bitfield)
		};
	}

	public avatarURL(options: { size?: number; format?: "png" | "jpg" | "gif" | "webp"; dynamic?: boolean } = { size: 128, format: "png", dynamic: true }) {
		if (!this.avatar) return null;
		const format = this.avatar.startsWith("a_") && options.dynamic ? "gif" : (options.format || "png");
		return `${Constants.BASE_CDN_URL}/avatars/${this.id}/${this.avatar}.${format}${!["gif", "webp"].includes(format) ? `?size=${options.size}` : ""}`;
	}

	public displayAvatarURL(options: { size?: number; format?: "png" | "jpg" | "gif" | "webp"; dynamic?: boolean } = { size: 128, format: "png", dynamic: true }) {
		if (!this.avatar) return this.defaultAvatarURL;
		else return this.avatarURL(options);
	}

	public fetch() {
		return Promise.resolve(this);
	}

	public send(content: import("../Types").StringResolvable, options: import("../Types").MessageOptions = {}) {
		return TextBasedChannel.send(this, content, options);
	}

	public _patch(data: import("@amanda/discordtypings").UserData) {
		if (data.username) this.username = data.username;
		if (data.discriminator) this.discriminator = data.discriminator;
		if (!this.bot || data.bot !== undefined) this.bot = data.bot || false;
		if (data.id) this.id = data.id;
		if (!this.avatar || data.avatar !== undefined) this.avatar = data.avatar || null;
		if (!this.flags || data.public_flags) this.flags = new UserFlags(data.public_flags || 0).freeze();
		if (!this.system || data.system !== undefined) this.system = data.system || false;
	}
}

export = User;

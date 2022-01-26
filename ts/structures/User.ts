// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import TextBasedChannel from "./interfaces/TextBasedChannel";

import Base from "./Base";
import UserFlags from "../util/UserFlags";
import SnowflakeUtil from "../util/SnowflakeUtil";

// @ts-ignore
class User extends Base implements TextBasedChannel {
	public lastMessageId: TextBasedChannel["lastMessageId"] = null;
	public lastMessage: TextBasedChannel["lastMessage"] = null;
	public send!: TextBasedChannel["send"];

	public partial: false = false;
	public username!: string;
	public discriminator!: string;
	public bot!: boolean;
	public id!: string;
	public avatar!: string | null;
	public flags!: Readonly<UserFlags>;
	public system!: boolean;
	public dmChannel: import("./DMChannel") | null = null;
	public presence: import("./Presence").Presence | null = null;
	public lastMessageChannelId: string | null = null;

	public static readonly default = User;

	public constructor(client: import("../client/Client"), data: import("discord-typings").UserData) {
		super(client);

		if (data.username) this.username = data.username;
		if (data.discriminator) this.discriminator = data.discriminator;
		if (!this.bot || data.bot !== undefined) this.bot = data.bot || false;
		if (data.id) this.id = data.id;
		if (!this.avatar) this.avatar = data.avatar || null;
		if (!this.flags || data.public_flags) this.flags = new UserFlags(data.public_flags || 0).freeze();
		if (!this.system || data.system !== undefined) this.system = data.system || false;
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public get tag() {
		return `${this.username}#${this.discriminator}`;
	}

	public get defaultAvatarURL() {
		return this.client.rest.cdn.DefaultAvatar(Number(this.discriminator) % 5);
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

	public avatarURL(options: import("../Types").ImageURLOptions & { dynamic?: boolean } = { size: 128, format: "png", dynamic: true }) {
		if (!this.avatar) return null;
		return this.client.rest.cdn.Avatar(this.id, this.avatar, options.format, options.size, options.dynamic);
	}

	public async createDM() {
		const DMChannel: typeof import("./DMChannel") = require("./DMChannel");
		const d = await this.client._snow.user.createDirectMessageChannel(this.id);
		const channel = new DMChannel(this.client, d);
		this.dmChannel = channel;
		return channel;
	}

	public async deleteDM() {
		const { dmChannel } = this;
		if (!dmChannel) throw new Error("USER_NO_DMCHANNEL");
		const data = await this.client.api.channels(dmChannel.id).delete();
		this.client.actions.ChannelDelete.handle(data);
		return dmChannel;
	}

	public displayAvatarURL(options: import("../Types").ImageURLOptions & { dynamic?: boolean } = { size: 128, format: "png", dynamic: true }) {
		if (!this.avatar) return this.defaultAvatarURL;
		else return this.avatarURL(options);
	}

	public equals(user: User) {
		return user &&
			this.id === user.id &&
			this.username === user.username &&
			this.discriminator === user.discriminator &&
			this.avatar === user.avatar;
	}

	public async fetchFlags(force = false) {
		if (this.flags && !force) return this.flags;
		const data = await this.client._snow.user.getUser(this.id);
		this._patch(data);
		return this.flags;
	}

	public fetch() {
		return Promise.resolve(this);
	}

	public _patch(data: import("discord-typings").UserData) {
		if (data.username) this.username = data.username;
		if (data.discriminator) this.discriminator = data.discriminator;
		if (!this.bot || data.bot !== undefined) this.bot = data.bot || false;
		if (data.id) this.id = data.id;
		if (!this.avatar || data.avatar !== undefined) this.avatar = data.avatar || null;
		if (!this.flags || data.public_flags) this.flags = new UserFlags(data.public_flags || 0).freeze();
		if (!this.system || data.system !== undefined) this.system = data.system || false;
	}
}

TextBasedChannel.applyToClass(User);

export = User;

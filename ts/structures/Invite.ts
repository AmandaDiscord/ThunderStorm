import Constants from "../util/Constants";

class Invite {
	public static INVITES_PATTERN = /discord(?:(?:app)?\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi;

	public client: import("../client/Client");
	public guild: import("./Partial/PartialGuild") | null = null;
	public code!: string;
	public presenceCount = 0;
	public memberCount = 0;
	public temporary = true;
	public maxAge = 0;
	public uses = 0;
	public maxUses = 0;
	public inviter: import("./User") | null = null;
	public channel!: import("./Partial/PartialChannel");
	public createdTimestamp!: number;
	public targetUserType: 1 | 2 | null = null;
	public targetUser: import("./User") | null = null;
	private _expiresAt: string | null = null;

	public constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").InviteData & { channel_id?: string; created_at?: string; guild_id?: string; temporary?: boolean; max_age?: number; max_uses?: number; uses?: number }) {
		this.client = client;

		if (data && data.approximate_member_count && data.guild) Object.assign(data.guild, { member_count: data.approximate_member_count });

		if (data) this._patch(data);
	}

	public get createdAt() {
		return this.createdTimestamp ? new Date(this.createdTimestamp) : null;
	}

	public get expiresTimestamp() {
		return this._expiresAt ? new Date(this._expiresAt).getTime() : (this.createdTimestamp && this.maxAge ? this.createdTimestamp + (this.maxAge * 1000) : null);
	}

	public get expiresAt() {
		return this._expiresAt ? new Date(this._expiresAt) : (this.expiresTimestamp ? new Date(this.expiresTimestamp) : null);
	}

	public get url() {
		return `https://discord.gg/${this.code}`;
	}

	public async delete() {
		await this.client._snow.invite.deleteInvite(this.code);
		return this;
	}

	public toString() {
		return this.url;
	}

	public toJSON() {
		const value: { guild?: { id: string; name: string; }; guild_id?: string; code: string; approximate_presence_count: number; approximate_member_count: number; temporary: boolean; max_age: number; max_uses: number; inviter?: import("@amanda/discordtypings").UserData; channel: { id: string; name: string; type: number; }; channel_id: string; created_at?: string; expires_at?: string; } = {
			code: this.code,
			approximate_presence_count: this.presenceCount,
			approximate_member_count: this.memberCount,
			temporary: this.temporary,
			max_age: this.maxAge,
			max_uses: this.maxUses,
			channel: this.channel.toJSON(),
			channel_id: this.channel.id
		};
		if (this.inviter) value["inviter"] = this.inviter.toJSON();
		if (this.createdAt) value["created_at"] = this.createdAt.toISOString();
		if (this.guild) {
			value["guild"] = this.guild.toJSON();
			value["guild_id"] = this.guild.id;
		}
		if (this.expiresAt) value["expires_at"] = this.expiresAt.toISOString();
		return value;
	}

	public valueOf() {
		return this.code;
	}

	public _patch(data: import("@amanda/discordtypings").InviteData & { channel_id?: string; created_at?: string; guild_id?: string; temporary?: boolean; max_age?: number; max_uses?: number; uses?: number }) {
		const PartialGuild: typeof import("./Partial/PartialGuild") = require("./Partial/PartialGuild");
		const User: typeof import("./User") = require("./User");
		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");

		if (data.guild || data.guild_id) this.guild = new PartialGuild(this.client, { id: data.guild ? data.guild.id as string : data.guild_id as string, name: data.guild ? data.guild.name : undefined });
		if (data.code) this.code = data.code;
		if (data.approximate_presence_count !== undefined) this.presenceCount = data.approximate_presence_count;
		if (data.approximate_member_count !== undefined) this.memberCount = data.approximate_member_count;
		if (data.temporary !== undefined) this.temporary = data.temporary;
		if (data.max_age !== undefined) this.maxAge = data.max_age;
		if (data.uses !== undefined) this.uses = data.uses;
		if (data.max_uses !== undefined) this.maxUses = data.max_uses;
		if (data.channel || data.channel_id) this.channel = new PartialChannel(this.client, { id: data.channel ? data.channel.id : data.channel_id as string, name: data.channel ? data.channel.name : undefined, guild_id: data.guild ? data.guild.id : data.guild_id, type: data.channel ? Constants.ChannelTypes[data.channel.type] : undefined });
		if (data.created_at) this.createdTimestamp = new Date(data.created_at).getTime();
		if (data.inviter) {
			if (data.inviter.id === this.client.user?.id) this.client.user._patch(data.inviter);
			this.inviter = data.inviter.id === this.client.user?.id ? this.client.user : new User(this.client, data.inviter);
		}
		if (data.target_type !== undefined) this.targetUserType = data.target_type;
		if (data.target_user !== undefined) this.targetUser = new User(this.client, data.target_user);
		if (data.expires_at) this._expiresAt = data.expires_at;
	}
}

export = Invite;

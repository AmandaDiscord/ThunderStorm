import Constants from "../Constants";

class Invite {
	public client: import("./Client");
	public guild: import("./Guild");
	public code: string;
	public presenceCount: number;
	public memberCount: number;
	public textChannelCount: number;
	public voiceChannelCount: number;
	public temporary: boolean;
	public maxAge: number;
	public uses: number;
	public maxUses: number;
	public inviter: import("./User");
	public channel: import("./Partial/PartialChannel");
	public createdTimestamp: number;

	public constructor(data: any, client: import("./Client")) {
		const Guild = require("./Guild");
		const User = require("./User");
		const PartialChannel = require("./Partial/PartialChannel");
		const PartialUser = require("./Partial/PartialUser");

		this.client = client;

		if (data.approximate_member_count && data.guild) Object.assign(data.guild, { member_count: data.approximate_member_count });

		this.guild = new Guild(data.guild, client);
		this.code = data.code;
		this.presenceCount = data.approximate_presence_count || 0;
		this.memberCount = data.approximate_member_count || 0;
		this.textChannelCount = data.text_channel_count || 0;
		this.voiceChannelCount = data.voice_channel_count || 0;
		this.temporary = data.temporary || false;
		this.maxAge = data.max_age || 0;
		this.uses = data.uses || 0;
		this.maxUses = data.max_uses || 0;
		this.inviter = data.inviter ? (data.invite.id === client.user?.id ? client.user : new User(data.inviter, client)) : new PartialUser({ id: Constants.SYSTEM_USER_ID }, client);
		this.channel = new PartialChannel({ id: data.channel.id, guild_id: data.guild.id }, client);
		this.createdTimestamp = data.created_at ? new Date(data.created_at).getTime() : new Date().getTime();
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public get expiresTimestamp() {
		return this.createdTimestamp + (this.maxAge * 1000);
	}

	public get expiresAt() {
		return new Date(this.expiresTimestamp);
	}

	public get url() {
		return `https://discord.gg/${this.code}`;
	}

	public delete() {
		return this.client._snow.invite.deleteInvite(this.code).then(() => this);
	}

	public toString() {
		return this.url;
	}

	public toJSON() {
		return {
			guild: this.guild.toJSON(),
			code: this.code,
			approximate_presence_count: this.presenceCount,
			approximate_member_count: this.memberCount,
			text_channel_count: this.textChannelCount,
			voice_channel_count: this.voiceChannelCount,
			temporary: this.temporary,
			max_age: this.maxAge,
			max_uses: this.maxUses,
			inviter: this.inviter.toJSON(),
			channel: this.channel.toJSON(),
			created_at: this.createdAt.toUTCString()
		};
	}
}

export = Invite;

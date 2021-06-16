import TextBasedChannel from "./interfaces/TextBasedChannel";

import Collection from "../util/Collection";

import User from "./User";

// @ts-ignore
class GuildMember implements TextBasedChannel {
	public lastMessageID!: TextBasedChannel["lastMessageID"];
	public lastMessage!: TextBasedChannel["lastMessage"];
	public send!: TextBasedChannel["send"];

	public client: import("../client/Client");
	public user!: import("./User");
	public id!: string;
	public nickname: string | null = null;
	public deaf = false;
	public mute = false;
	public joinedAt: Date = new Date();
	public joinedTimestamp!: number;
	public premiumSince: Date | null = null;
	public premiumSinceTimestamp: number | null = null;
	public roles: Collection<string, import("./Partial/PartialRole")> = new Collection();
	public guild: import("./Partial/PartialGuild") | null = null;
	public avatar: string | null = null;
	public hoistRole: import("./Partial/PartialRole") | null = null;
	public presence: import("./Presence").Presence | null = null;
	public lastMessageChannelID: string | null = null;

	public constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").MemberData & { user: import("@amanda/discordtypings").UserData; guild_id?: string }) {
		this.client = client;

		if (data) this._patch(data);
	}

	public get displayName() {
		return this.nickname || this.user.username;
	}

	/**
	 * A combination of the member's tag and nickname
	 * - Nickname set:   PapiOphidian#0110 (Async)
	 * - Nickname unset: PapiOphidian#0110
	 */
	public get displayTag() {
		return this.nickname ? `${this.user.tag} (${this.nickname})` : this.user.tag;
	}

	public createDM() {
		return this.user.createDM();
	}

	public deleteDM() {
		return this.user.deleteDM();
	}

	public async kick(reason?: string) {
		if (!this.guild) return this;
		await this.client._snow.guild.removeGuildMember(this.guild.id, this.id, { reason });
		return this;
	}

	public async ban(options?: { days?: number; reason?: string }) {
		if (!this.guild) return this;
		await this.client._snow.guild.createGuildBan(this.guild.id, this.id, { delete_message_days: options?.days || 0, reason: options?.reason });
	}

	public toString() {
		return `<@${this.id}>`;
	}

	public toJSON() {
		return {
			id: this.id,
			nick: this.nickname,
			mute: this.mute,
			joined_at: this.joinedAt.toISOString(),
			premium_since: this.premiumSince,
			user: this.user.toJSON(),
			roles: this.roles.map(r => r.id),
			guild_id: this.guild ? this.guild.id : null,
			hoisted_role: this.hoistRole ? this.hoistRole.id : null
		};
	}

	public _patch(data: import("@amanda/discordtypings").MemberData & { user: import("@amanda/discordtypings").UserData; guild_id?: string }) {
		const PartialGuild: typeof import("./Partial/PartialGuild") = require("./Partial/PartialGuild");
		const PartialRole: typeof import("./Partial/PartialRole") = require("./Partial/PartialRole");

		if (data.user) {
			if (data.user.id === this.client.user?.id) this.client.user._patch(data.user);
			this.user = data.user.id === this.client.user?.id ? this.client.user : new User(this.client, data.user);
			this.id = data.user.id;
		}
		if (data.nick !== undefined) this.nickname = data.nick;
		if (data.deaf !== undefined) this.deaf = data.deaf;
		if (data.mute !== undefined) this.mute = data.mute;
		if (data.joined_at) {
			this.joinedAt = new Date(data.joined_at);
			this.joinedTimestamp = this.joinedAt.getTime();
		}
		if (data.premium_since !== undefined) {
			this.premiumSince = new Date(data.premium_since);
			this.premiumSinceTimestamp = this.premiumSince.getTime();
		}
		if (!this.guild || data.guild_id) {
			if (data.guild_id && !this.roles.has(data.guild_id)) this.roles.set(data.guild_id, new PartialRole(this.client, { id: data.guild_id, name: "@everyone" }));
			this.guild = data.guild_id ? new PartialGuild(this.client, { id: data.guild_id }) : null;
		}
		if (data.roles && Array.isArray(data.roles)) {
			this.roles.clear();
			for (const role of data.roles) {
				if (role === data.guild_id || role === this.guild?.id) continue;
				const r = new PartialRole(this.client, { id: role });
				r.guild = this.guild;
				this.roles.set(role, r);
			}
		}
		if (data.avatar !== undefined) this.avatar = data.avatar;
		if (data.hoisted_role || !this.hoistRole) this.hoistRole = data.hoisted_role ? this.roles.get(data.hoisted_role) || null : null;
	}
}

TextBasedChannel.applyToClass(GuildMember);

export = GuildMember;

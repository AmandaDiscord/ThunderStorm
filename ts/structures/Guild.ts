import Constants from "../util/Constants";

import BaseGuild from "./BaseGuild";
import CategoryChannel from "./CategoryChannel";
import Collection from "../util/Collection";
import Emoji from "./Emoji";
import GuildMember from "./GuildMember";
import NewsChannel from "./NewsChannel";
import Role from "./Role";
import StoreChannel from "./StoreChannel";
import StageChannel from "./StageChannel";
import SystemChannelFlags from "../util/SystemChannelFlags";
import TextChannel from "./TextChannel";
import VoiceChannel from "./VoiceChannel";
import VoiceState from "./VoiceState";

import GuildApplicationCommandManager from "../managers/GuildApplicationCommandManager";

class Guild extends BaseGuild {
	public partial: false = false;
	public name = "unknown";
	public id!: string;
	public available!: boolean;
	public memberCount = 0;
	public approximateMemberCount = 0;
	public approximatePresenceCount = 0;
	public ownerID = Constants.SYSTEM_USER_ID;
	public owner!: import("./Partial/PartialUser");
	public icon: string | null = null;
	public banner: string | null = null;
	public description: string | null = null;
	public discoverySplash: string | null = null;
	public features: Array<import("../Types").Feature> = [];
	public large = false;
	public splash: string | null = null;
	public applicationID: string | null = null;
	public afkTimeout = 0;
	public afkChannelID: string | null = null;
	public systemChannelID: string | null = null;
	public systemChannelFlags!: Readonly<SystemChannelFlags>;
	public premiumTier = 0;
	public premiumSubscriptionCount = 0;
	public vanityURLCode: string | null = null;
	public rulesChannelID: string | null = null;
	public publicUpdatesChannelID: string | null = null;
	public preferredLocale = "en-US";
	public members: Collection<string, GuildMember> = new Collection();
	public channels: Collection<string, import("./GuildChannel")> = new Collection();
	public roles: Collection<string, Role> = new Collection();
	public voiceStates: Collection<string, VoiceState> = new Collection();
	public emojis: Collection<string, Emoji> = new Collection;
	public defaultMessageNotifications: "ALL" | "MENTIONS" = "ALL";
	public mfaLevel: 0 | 1 = 0;
	public maximumMembers = 100000;
	public maximumPresences = 25000;
	public shardID = 0;
	public verificationLevel!: "NONE" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH"
	public threads: Collection<string, import("./ThreadNewsChannel") | import("./ThreadTextChannel")> = new Collection();
	public stageInstances: Collection<string, import("./Partial/PartialChannel")> = new Collection();
	public joinedTimestamp!: number;
	public commands: GuildApplicationCommandManager;

	public constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").GuildData) {
		super(client, data);

		this.commands = new GuildApplicationCommandManager(this);

		if (data) this._patch(data);
	}

	public get joinedAt() {
		return new Date(this.joinedTimestamp);
	}

	public get me() {
		return new GuildMember(this.client, { guild_id: this.id, deaf: false, hoisted_role: this.id, joined_at: this.joinedAt.toISOString(), mute: false, nick: null, roles: [], user: (this.client.user as import("./ClientUser")).toJSON() });
	}

	public bannerURL(options: import("../Types").ImageURLOptions = { format: "png", size: 512 }) {
		if (!this.banner) return null;
		return this.client.rest.cdn.Banner(this.id, this.banner, options.format, options.size);
	}

	public toJSON() {
		return {
			name: this.name,
			id: this.id,
			unavailable: !this.available,
			member_count: this.memberCount,
			approximate_member_count: this.approximateMemberCount,
			approximate_presence_count: this.approximatePresenceCount,
			owner_id: this.ownerID,
			icon: this.icon,
			banner: this.banner,
			description: this.description,
			discovery_splash: this.discoverySplash,
			features: this.features,
			large: this.large,
			splash: this.splash,
			application_id: this.applicationID,
			afk_timeout: this.afkTimeout,
			afk_channel_id: this.afkChannelID,
			system_channel_id: this.systemChannelID,
			premium_tier: this.premiumTier,
			premium_subscription_count: this.premiumSubscriptionCount,
			system_channel_flags: Number(this.systemChannelFlags.bitfield),
			vanity_url_code: this.vanityURLCode,
			rules_channel_id: this.rulesChannelID,
			preferred_locale: this.preferredLocale,
			members: [...this.members.values()].map(mem => mem.toJSON()),
			channels: [...this.channels.values()].map(chan => chan.toJSON()),
			roles: [...this.roles.values()].map(role => role.toJSON()),
			voice_states: [...this.voiceStates.values()].map(state => state.toJSON()),
			emojis: [...this.emojis.values()].map(emoji => emoji.toJSON())
		};
	}

	public async fetchMembers(options: string): Promise<import("./GuildMember") | null>
	public async fetchMembers(options: import("../Types").FetchMemberOptions): Promise<Array<import("./GuildMember")> | null>
	public async fetchMembers(options: string | import("../Types").FetchMemberOptions) {
		if (typeof options === "string") return this.client._snow.guild.getGuildMember(this.id, options).then(d => new GuildMember(this.client, d as any));
		else {
			const payload: { limit?: number; after?: string; } = {};
			if (options.limit) payload["limit"] = options.limit;
			if (options.after) payload["after"] = options.after;
			const data = await this.client._snow.guild.getGuildMembers(this.id, payload) as unknown as Array<import("@amanda/discordtypings").MemberData & { user: import("@amanda/discordtypings").UserData }>;
			if (!data || data.length === 0) return null;
			if (!options.query) return data.map(d => new GuildMember(this.client, d));
			else if (options.ids) return data.filter(d => (d.user ? options.ids?.includes(d.user.id) : false)).map(d => new GuildMember(this.client, d));
			else return data.filter(d => options.query && d.nick && d.nick.includes(options.query) || (d.user ? options.query && d.user.username.includes(options.query) : false) || (d.user ? options.query && d.user.id.includes(options.query) : false) || (d.user ? `${d.user.username}#${d.user.discriminator}` === options.query : false)).map(d => new GuildMember(this.client, d));
		}
	}

	public async fetchInvites() {
		const Invite: typeof import("./Invite") = require("./Invite");
		const inviteItems = await this.client._snow.guild.getGuildInvites(this.id);
		const invites: Collection<string, import("./Invite")> = new Collection();
		for (const inviteItem of inviteItems) {
			const invite = new Invite(this.client, inviteItem);
			invites.set(invite.code, invite);
		}
		return invites;
	}

	public _patch(data: import("@amanda/discordtypings").GuildData) {
		const PartialChannel: typeof import("./Partial/PartialChannel") = require("./Partial/PartialChannel");
		const PartialUser: typeof import("./Partial/PartialUser") = require("./Partial/PartialUser");

		if (data.name) this.name = data.name;
		if (data.id) this.id = data.id;
		this.available = data.unavailable !== undefined ? !data.unavailable : (this.available ? true : false);
		if (data.member_count) this.memberCount = data.member_count;
		if (data.approximate_member_count !== undefined) this.approximateMemberCount = data.approximate_member_count;
		if (data.approximate_presence_count !== undefined) this.approximatePresenceCount = data.approximate_presence_count;
		if (data.max_members !== undefined) this.maximumMembers = data.max_members;
		if (data.max_presences !== undefined) this.maximumPresences = data.max_presences;
		if (data.owner_id) this.ownerID = data.owner_id;
		if (data.banner !== undefined) this.banner = data.banner;
		if (data.description !== undefined) this.description = data.description;
		if (data.discovery_splash !== undefined) this.discoverySplash = data.discovery_splash;
		if (data.features) this.features = data.features as unknown as Array<import("../Types").Feature>;
		if (data.large !== undefined) this.large = data.large;
		if (data.splash !== undefined) this.splash = data.splash;
		if (data.application_id !== undefined) this.applicationID = data.application_id;
		if (data.afk_timeout !== undefined) this.afkTimeout = data.afk_timeout;
		if (data.afk_channel_id !== undefined) this.afkChannelID = data.afk_channel_id;
		if (data.system_channel_id !== undefined) this.systemChannelID = data.system_channel_id;
		if (data.premium_tier !== undefined) this.premiumTier = data.premium_tier;
		if (data.premium_subscription_count !== undefined) this.premiumSubscriptionCount = data.premium_subscription_count;
		if (!this.systemChannelFlags || data.system_channel_flags) this.systemChannelFlags = new SystemChannelFlags(data.system_channel_flags).freeze();
		if (data.vanity_url_code !== undefined) this.vanityURLCode = data.vanity_url_code;
		if (data.rules_channel_id !== undefined) this.rulesChannelID = data.rules_channel_id;
		if (data.preferred_locale) this.preferredLocale = data.preferred_locale;
		if (data.mfa_level !== undefined) this.mfaLevel = data.mfa_level;
		this.owner = this.owner && data.owner_id === this.owner.id ? this.owner : new PartialUser(this.client, { id: this.ownerID });
		this.icon = data.icon || (this.icon ? this.icon : null);
		if (!this.verificationLevel || data.verification_level !== undefined) this.verificationLevel = Constants.VerificationLevels[data.verification_level] || "NONE";

		if (data.members && Array.isArray(data.members)) {
			this.members.clear();
			data.members.forEach(member => this.members.set(member.user.id, new GuildMember(this.client, member)));
		}

		if (data.channels && Array.isArray(data.channels)) {
			this.channels.clear();
			for (const channel of data.channels) {
				let chan;
				if (channel.type === 2) chan = new VoiceChannel(this as any, channel);
				else if (channel.type === 4) chan = new CategoryChannel(this as any, channel);
				else if (channel.type === 5) chan = new NewsChannel(this as any, channel);
				// @ts-ignore
				else if (channel.type === 6) chan = new StoreChannel(this as any, channel);
				else if (channel.type === 13) chan = new StageChannel(this as any, channel);
				else chan = new TextChannel(this as any, channel);
				this.channels.set(chan.id, chan);
			}
		}

		if (data.roles && Array.isArray(data.roles)) {
			this.roles.clear();
			for (const role of data.roles) this.roles.set(role.id, new Role(this.client, Object.assign({}, role, { guild_id: this.id })));
		}

		if (data.voice_states && Array.isArray(data.voice_states)) {
			this.voiceStates.clear();
			for (const state of data.voice_states) this.voiceStates.set(state.user_id, new VoiceState(this.client, state));
		}

		if (data.emojis && Array.isArray(data.emojis)) {
			this.emojis.clear();
			for (const emoji of data.emojis) this.emojis.set(emoji.id || emoji.name, new Emoji(this.client, emoji));
		}

		if (data.threads && Array.isArray(data.threads)) {
			const ThreadNewsChannel: typeof import("./ThreadNewsChannel") = require("./ThreadNewsChannel");
			const ThreadTextChannel: typeof import("./ThreadTextChannel") = require("./ThreadTextChannel");

			this.threads.clear();
			for (const thread of data.threads) this.threads.set(thread.id, [11, 12].includes(thread.type) ? new ThreadTextChannel(this as any, thread) : new ThreadNewsChannel(this as any, thread));
		}

		if (data.stage_instances && Array.isArray(data.stage_instances)) {
			this.stageInstances.clear();
			for (const instance of data.stage_instances) this.stageInstances.set(instance.id, new PartialChannel(this.client, instance));
		}
	}
}

export = Guild;

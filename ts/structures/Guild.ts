// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Constants from "../util/Constants";
import Util from "../util/Util";

import AnonymousGuild from "./AnonymousGuild";
import { Collection } from "@discordjs/collection";
import Emoji from "./Emoji";
import GuildMember from "./GuildMember";
import Role from "./Role";
import SystemChannelFlags from "../util/SystemChannelFlags";
import VoiceState from "./VoiceState";
import WelcomeScreen from "./WelcomeScreen";

import GuildApplicationCommandManager from "../managers/GuildApplicationCommandManager";

class Guild extends AnonymousGuild {
	public partial: false = false;
	public name = "unknown";
	public id!: string;
	public available!: boolean;
	public memberCount = 0;
	public approximateMemberCount = 0;
	public approximatePresenceCount = 0;
	public ownerId = Constants.SYSTEM_USER_ID;
	public owner!: import("./Partial/PartialUser");
	public icon: string | null = null;
	public discoverySplash: string | null = null;
	public large = false;
	public applicationId: string | null = null;
	public afkTimeout = 0;
	public afkChannelId: string | null = null;
	public systemChannelId: string | null = null;
	public systemChannelFlags!: Readonly<SystemChannelFlags>;
	public premiumTier = 0;
	public premiumSubscriptionCount = 0;
	public rulesChannelId: string | null = null;
	public publicUpdatesChannelId: string | null = null;
	public preferredLocale = "en-US";
	public members = new Collection<string, GuildMember>();
	public channels = new Collection<string, import("./GuildChannel")>();
	public roles = new Collection<string, Role>();
	public voiceStates = new Collection<string, VoiceState>();
	public emojis = new Collection<string, Emoji>();
	public defaultMessageNotifications: "ALL" | "MENTIONS" = "ALL";
	public mfaLevel: 0 | 1 = 0;
	public maximumMembers = 100000;
	public maximumPresences = 25000;
	public shardId = 0;
	public threads = new Collection<string, import("./ThreadNewsChannel") | import("./ThreadTextChannel")>();
	public stageInstances = new Collection<string, import("./Partial/PartialChannel")>();
	public joinedTimestamp!: number;
	public commands: GuildApplicationCommandManager;

	public static readonly default = Guild;

	public constructor(client: import("../client/Client"), data: import("discord-typings").GuildData) {
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

	public async fetchWelcomeScreen() {
		const data = await this.client.api.guilds(this.id, "welcome-screen").get();
		return new WelcomeScreen(this, data);
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
			owner_id: this.ownerId,
			icon: this.icon,
			banner: this.banner,
			description: this.description,
			discovery_splash: this.discoverySplash,
			features: this.features,
			large: this.large,
			splash: this.splash,
			application_id: this.applicationId,
			afk_timeout: this.afkTimeout,
			afk_channel_id: this.afkChannelId,
			system_channel_id: this.systemChannelId,
			premium_tier: this.premiumTier,
			premium_subscription_count: this.premiumSubscriptionCount,
			system_channel_flags: Number(this.systemChannelFlags.bitfield),
			vanity_url_code: this.vanityURLCode,
			rules_channel_id: this.rulesChannelId,
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
			const data = await this.client._snow.guild.getGuildMembers(this.id, payload) as unknown as Array<import("discord-typings").MemberData & { user: import("discord-typings").UserData }>;
			if (!data || data.length === 0) return null;
			if (!options.query) return data.map(d => new GuildMember(this.client, d));
			else if (options.Ids) return data.filter(d => (d.user ? options.Ids?.includes(d.user.id) : false)).map(d => new GuildMember(this.client, d));
			else return data.filter(d => options.query && d.nick && d.nick.includes(options.query) || (d.user ? options.query && d.user.username.includes(options.query) : false) || (d.user ? options.query && d.user.id.includes(options.query) : false) || (d.user ? `${d.user.username}#${d.user.discriminator}` === options.query : false)).map(d => new GuildMember(this.client, d));
		}
	}

	public async fetchInvites() {
		const Invite: typeof import("./Invite") = require("./Invite");
		const inviteItems = await this.client._snow.guild.getGuildInvites(this.id);
		const invites = new Collection<string, import("./Invite")>();
		for (const inviteItem of inviteItems) {
			const invite = new Invite(this.client, inviteItem);
			invites.set(invite.code, invite);
		}
		return invites;
	}

	public _patch(data: import("discord-typings").GuildData) {
		super._patch(data);
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
		if (data.owner_id) this.ownerId = data.owner_id;
		if (data.discovery_splash !== undefined) this.discoverySplash = data.discovery_splash;
		if (data.large !== undefined) this.large = data.large;
		if (data.application_id !== undefined) this.applicationId = data.application_id;
		if (data.afk_timeout !== undefined) this.afkTimeout = data.afk_timeout;
		if (data.afk_channel_id !== undefined) this.afkChannelId = data.afk_channel_id;
		if (data.system_channel_id !== undefined) this.systemChannelId = data.system_channel_id;
		if (data.premium_tier !== undefined) this.premiumTier = data.premium_tier;
		if (data.premium_subscription_count !== undefined) this.premiumSubscriptionCount = data.premium_subscription_count;
		if (!this.systemChannelFlags || data.system_channel_flags) this.systemChannelFlags = new SystemChannelFlags(data.system_channel_flags).freeze();
		if (data.rules_channel_id !== undefined) this.rulesChannelId = data.rules_channel_id;
		if (data.preferred_locale) this.preferredLocale = data.preferred_locale;
		if (data.mfa_level !== undefined) this.mfaLevel = data.mfa_level;
		this.owner = this.owner && data.owner_id === this.owner.id ? this.owner : new PartialUser(this.client, { id: this.ownerId });
		this.icon = data.icon || (this.icon ? this.icon : null);

		if (!this.members) this.members = new Collection();
		if (data.members && Array.isArray(data.members)) {
			this.members.clear();
			data.members.forEach(member => this.members.set(member.user.id, new GuildMember(this.client, member)));
		}

		if (!this.channels) this.channels = new Collection();
		if (data.channels && Array.isArray(data.channels)) {
			this.channels.clear();
			for (const channel of data.channels) {
				const chan = Util.createChannelFromData(this.client, channel) as import("./GuildChannel");
				this.channels.set(chan.id, chan);
			}
		}

		if (!this.roles) this.roles = new Collection();
		if (data.roles && Array.isArray(data.roles)) {
			this.roles.clear();
			for (const role of data.roles) this.roles.set(role.id, new Role(this.client, Object.assign({}, role, { guild_id: this.id })));
		}

		if (!this.voiceStates) this.voiceStates = new Collection();
		if (data.voice_states && Array.isArray(data.voice_states)) {
			this.voiceStates.clear();
			for (const state of data.voice_states) this.voiceStates.set(state.user_id, new VoiceState(this.client, state));
		}

		if (!this.emojis) this.emojis = new Collection();
		if (data.emojis && Array.isArray(data.emojis)) {
			this.emojis.clear();
			for (const emoji of data.emojis) this.emojis.set(emoji.id || emoji.name, new Emoji(this.client, emoji));
		}

		if (!this.threads) this.threads = new Collection();
		if (data.threads && Array.isArray(data.threads)) {
			const ThreadNewsChannel: typeof import("./ThreadNewsChannel") = require("./ThreadNewsChannel");
			const ThreadTextChannel: typeof import("./ThreadTextChannel") = require("./ThreadTextChannel");

			this.threads.clear();
			for (const thread of data.threads) this.threads.set(thread.id, [11, 12].includes(thread.type) ? new ThreadTextChannel(this as any, thread) : new ThreadNewsChannel(this as any, thread));
		}

		if (!this.stageInstances) this.stageInstances = new Collection();
		if (data.stage_instances && Array.isArray(data.stage_instances)) {
			this.stageInstances.clear();
			for (const instance of data.stage_instances) this.stageInstances.set(instance.id, new PartialChannel(this.client, { id: instance.channel_id, guild_id: instance.guild_id, type: Constants.ChannelTypes[13] }));
		}
	}
}

export = Guild;

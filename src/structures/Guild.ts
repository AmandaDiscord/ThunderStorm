import Constants from "../Constants";

import Base from "./Base";
import CategoryChannel from "./CategoryChannel";
import Collection from "./Util/Collection";
import Emoji from "./Emoji";
import GuildMember from "./GuildMember";
import NewsChannel from "./NewsChannel";
import Role from "./Role";
import StageChannel from "./StageChannel";
import SystemChannelFlags from "./SystemChannelFlags";
import TextChannel from "./TextChannel";
import VoiceChannel from "./VoiceChannel";
import VoiceState from "./VoiceState";

class Guild extends Base {
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

	public constructor(data: import("@amanda/discordtypings").GuildData, client: import("./Client")) {
		super(data, client);

		this._patch(data);
	}

	public get nameAcronym() {
		return this.name
			.replace(/'s /g, " ")
			.replace(/\w+/g, e => e[0])
			.replace(/\s/g, "");
	}

	public get partnered() {
		return this.features.includes("PARTNERED");
	}

	public get verified() {
		return this.features.includes("VERIFIED");
	}

	public fetch() {
		return Promise.resolve(this);
	}

	public iconURL(options = { size: 128, format: "png", dynamic: true }) {
		if (!this.icon) return null;
		const format = this.icon.startsWith("a_") && options.dynamic ? "gif" : options.format || "png";
		return `${Constants.BASE_CDN_URL}/icons/${this.id}/${this.icon}.${format}${!["gif", "webp"].includes(format) ? `?size=${options.size || 128}` : ""}`;
	}

	public bannerURL(options = { format: "png", size: 512 }) {
		if (!this.banner) return null;
		return `${Constants.BASE_CDN_URL}/banners/${this.id}/${this.banner}.${options.format || "png"}${options.format != "webp" ? `?size=${options.size || 512}` : ""}`;
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
	public async fetchMembers(options: string | { ids?: Array<string>; query?: string; limit?: number; after?: string; }) {
		if (typeof options === "string") return this.client._snow.guild.getGuildMember(this.id, options).then(d => new GuildMember(d as any, this.client));
		else {
			const payload: { limit?: number; after?: string; } = {};
			if (options.limit) payload["limit"] = options.limit;
			if (options.after) payload["after"] = options.after;
			const data = await this.client._snow.guild.getGuildMembers(this.id, payload) as unknown as Array<import("@amanda/discordtypings").MemberData & { user: import("@amanda/discordtypings").UserData }>;
			if (!data || data.length === 0) return null;
			if (!options.query) return data.map(d => new GuildMember(d, this.client));
			else if (options.ids) return data.filter(d => (d.user ? options.ids?.includes(d.user.id) : false)).map(d => new GuildMember(d, this.client));
			else return data.filter(d => options.query && d.nick && d.nick.includes(options.query) || (d.user ? options.query && d.user.username.includes(options.query) : false) || (d.user ? options.query && d.user.id.includes(options.query) : false) || (d.user ? `${d.user.username}#${d.user.discriminator}` === options.query : false)).map(d => new GuildMember(d, this.client));
		}
	}

	public _patch(data: import("@amanda/discordtypings").GuildData) {
		const PartialUser = require("./Partial/PartialUser");

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
		this.owner = this.owner && data.owner_id === this.owner.id ? this.owner : new PartialUser({ id: this.ownerID }, this.client);
		this.icon = data.icon || (this.icon ? this.icon : null);
		if (!this.verificationLevel || data.verification_level !== undefined) this.verificationLevel = Constants.GUILD_VERIFICATION_LEVELS[data.verification_level] || "NONE";

		if (data.members && Array.isArray(data.members)) {
			this.members.clear();
			data.members.forEach(member => this.members.set(member.user.id, new GuildMember(member, this.client)));
		}

		if (data.channels && Array.isArray(data.channels)) {
			this.channels.clear();
			for (const channel of data.channels) {
				let chan;
				if (channel.type === 2) chan = new VoiceChannel(channel, this.client);
				else if (channel.type === 4) chan = new CategoryChannel(channel, this.client);
				else if (channel.type === 5) chan = new NewsChannel(channel, this.client);
				else if (channel.type === 13) chan = new StageChannel(channel, this.client);
				else chan = new TextChannel(channel, this.client);
				return this.channels.set(chan.id, chan);
			}
		}

		if (data.roles && Array.isArray(data.roles)) {
			this.roles.clear();
			for (const role of data.roles) this.roles.set(role.id, new Role(Object.assign({}, role, { guild_id: this.id }), this.client));
		}

		if (data.voice_states && Array.isArray(data.voice_states)) {
			this.voiceStates.clear();
			for (const state of data.voice_states) this.voiceStates.set(state.user_id, new VoiceState(state, this.client));
		}

		if (data.emojis && Array.isArray(data.emojis)) {
			this.emojis.clear();
			for (const emoji of data.emojis) this.emojis.set(emoji.id || emoji.name, new Emoji(emoji, this.client));
		}

		if (data.threads && Array.isArray(data.threads)) {
			const ThreadNewsChannel: typeof import("./ThreadNewsChannel") = require("./ThreadNewsChannel");
			const ThreadTextChannel: typeof import("./ThreadTextChannel") = require("./ThreadTextChannel");

			this.threads.clear();
			for (const thread of data.threads) this.threads.set(thread.id, [11, 12].includes(thread.type) ? new ThreadTextChannel(thread, this.client) : new ThreadNewsChannel(thread, this.client));
		}

		super._patch(data);
	}
}

export = Guild;

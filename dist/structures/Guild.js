"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("../Constants"));
const Base_1 = __importDefault(require("./Base"));
const CategoryChannel_1 = __importDefault(require("./CategoryChannel"));
const Collection_1 = __importDefault(require("./Util/Collection"));
const Emoji_1 = __importDefault(require("./Emoji"));
const GuildMember_1 = __importDefault(require("./GuildMember"));
const NewsChannel_1 = __importDefault(require("./NewsChannel"));
const Role_1 = __importDefault(require("./Role"));
const StageChannel_1 = __importDefault(require("./StageChannel"));
const SystemChannelFlags_1 = __importDefault(require("./SystemChannelFlags"));
const TextChannel_1 = __importDefault(require("./TextChannel"));
const VoiceChannel_1 = __importDefault(require("./VoiceChannel"));
const VoiceState_1 = __importDefault(require("./VoiceState"));
class Guild extends Base_1.default {
    constructor(data, client) {
        super(data, client);
        this.partial = false;
        this.name = "unknown";
        this.memberCount = 0;
        this.approximateMemberCount = 0;
        this.approximatePresenceCount = 0;
        this.ownerID = Constants_1.default.SYSTEM_USER_ID;
        this.icon = null;
        this.banner = null;
        this.description = null;
        this.discoverySplash = null;
        this.features = [];
        this.large = false;
        this.splash = null;
        this.applicationID = null;
        this.afkTimeout = 0;
        this.afkChannelID = null;
        this.systemChannelID = null;
        this.premiumTier = 0;
        this.premiumSubscriptionCount = 0;
        this.vanityURLCode = null;
        this.rulesChannelID = null;
        this.publicUpdatesChannelID = null;
        this.preferredLocale = "en-US";
        this.members = new Collection_1.default();
        this.channels = new Collection_1.default();
        this.roles = new Collection_1.default();
        this.voiceStates = new Collection_1.default();
        this.emojis = new Collection_1.default;
        this.defaultMessageNotifications = "ALL";
        this.mfaLevel = 0;
        this.maximumMembers = 100000;
        this.maximumPresences = 25000;
        this.shardID = 0;
        this.threads = new Collection_1.default();
        this._patch(data);
    }
    get nameAcronym() {
        return this.name
            .replace(/'s /g, " ")
            .replace(/\w+/g, e => e[0])
            .replace(/\s/g, "");
    }
    get partnered() {
        return this.features.includes("PARTNERED");
    }
    get verified() {
        return this.features.includes("VERIFIED");
    }
    fetch() {
        return Promise.resolve(this);
    }
    iconURL(options = { size: 128, format: "png", dynamic: true }) {
        if (!this.icon)
            return null;
        const format = this.icon.startsWith("a_") && options.dynamic ? "gif" : options.format || "png";
        return `${Constants_1.default.BASE_CDN_URL}/icons/${this.id}/${this.icon}.${format}${!["gif", "webp"].includes(format) ? `?size=${options.size || 128}` : ""}`;
    }
    bannerURL(options = { format: "png", size: 512 }) {
        if (!this.banner)
            return null;
        return `${Constants_1.default.BASE_CDN_URL}/banners/${this.id}/${this.banner}.${options.format || "png"}${options.format != "webp" ? `?size=${options.size || 512}` : ""}`;
    }
    toJSON() {
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
    async fetchMembers(options) {
        if (typeof options === "string")
            return this.client._snow.guild.getGuildMember(this.id, options).then(d => new GuildMember_1.default(d, this.client));
        else {
            const payload = {};
            if (options.limit)
                payload["limit"] = options.limit;
            if (options.after)
                payload["after"] = options.after;
            const data = await this.client._snow.guild.getGuildMembers(this.id, payload);
            if (!data || data.length === 0)
                return null;
            if (!options.query)
                return data.map(d => new GuildMember_1.default(d, this.client));
            else if (options.ids)
                return data.filter(d => { var _a; return (d.user ? (_a = options.ids) === null || _a === void 0 ? void 0 : _a.includes(d.user.id) : false); }).map(d => new GuildMember_1.default(d, this.client));
            else
                return data.filter(d => options.query && d.nick && d.nick.includes(options.query) || (d.user ? options.query && d.user.username.includes(options.query) : false) || (d.user ? options.query && d.user.id.includes(options.query) : false) || (d.user ? `${d.user.username}#${d.user.discriminator}` === options.query : false)).map(d => new GuildMember_1.default(d, this.client));
        }
    }
    _patch(data) {
        const PartialUser = require("./Partial/PartialUser");
        if (data.name)
            this.name = data.name;
        if (data.id)
            this.id = data.id;
        this.available = data.unavailable !== undefined ? !data.unavailable : (this.available ? true : false);
        if (data.member_count)
            this.memberCount = data.member_count;
        if (data.approximate_member_count !== undefined)
            this.approximateMemberCount = data.approximate_member_count;
        if (data.approximate_presence_count !== undefined)
            this.approximatePresenceCount = data.approximate_presence_count;
        if (data.max_members !== undefined)
            this.maximumMembers = data.max_members;
        if (data.max_presences !== undefined)
            this.maximumPresences = data.max_presences;
        if (data.owner_id)
            this.ownerID = data.owner_id;
        if (data.banner !== undefined)
            this.banner = data.banner;
        if (data.description !== undefined)
            this.description = data.description;
        if (data.discovery_splash !== undefined)
            this.discoverySplash = data.discovery_splash;
        if (data.features)
            this.features = data.features;
        if (data.large !== undefined)
            this.large = data.large;
        if (data.splash !== undefined)
            this.splash = data.splash;
        if (data.application_id !== undefined)
            this.applicationID = data.application_id;
        if (data.afk_timeout !== undefined)
            this.afkTimeout = data.afk_timeout;
        if (data.afk_channel_id !== undefined)
            this.afkChannelID = data.afk_channel_id;
        if (data.system_channel_id !== undefined)
            this.systemChannelID = data.system_channel_id;
        if (data.premium_tier !== undefined)
            this.premiumTier = data.premium_tier;
        if (data.premium_subscription_count !== undefined)
            this.premiumSubscriptionCount = data.premium_subscription_count;
        if (!this.systemChannelFlags || data.system_channel_flags)
            this.systemChannelFlags = new SystemChannelFlags_1.default(data.system_channel_flags).freeze();
        if (data.vanity_url_code !== undefined)
            this.vanityURLCode = data.vanity_url_code;
        if (data.rules_channel_id !== undefined)
            this.rulesChannelID = data.rules_channel_id;
        if (data.preferred_locale)
            this.preferredLocale = data.preferred_locale;
        if (data.mfa_level !== undefined)
            this.mfaLevel = data.mfa_level;
        this.owner = this.owner && data.owner_id === this.owner.id ? this.owner : new PartialUser({ id: this.ownerID }, this.client);
        this.icon = data.icon || (this.icon ? this.icon : null);
        if (!this.verificationLevel || data.verification_level !== undefined)
            this.verificationLevel = Constants_1.default.GUILD_VERIFICATION_LEVELS[data.verification_level] || "NONE";
        if (data.members && Array.isArray(data.members)) {
            this.members.clear();
            data.members.forEach(member => this.members.set(member.user.id, new GuildMember_1.default(member, this.client)));
        }
        if (data.channels && Array.isArray(data.channels)) {
            this.channels.clear();
            for (const channel of data.channels) {
                let chan;
                if (channel.type === 2)
                    chan = new VoiceChannel_1.default(channel, this.client);
                else if (channel.type === 4)
                    chan = new CategoryChannel_1.default(channel, this.client);
                else if (channel.type === 5)
                    chan = new NewsChannel_1.default(channel, this.client);
                else if (channel.type === 13)
                    chan = new StageChannel_1.default(channel, this.client);
                else
                    chan = new TextChannel_1.default(channel, this.client);
                return this.channels.set(chan.id, chan);
            }
        }
        if (data.roles && Array.isArray(data.roles)) {
            this.roles.clear();
            for (const role of data.roles)
                this.roles.set(role.id, new Role_1.default(Object.assign({}, role, { guild_id: this.id }), this.client));
        }
        if (data.voice_states && Array.isArray(data.voice_states)) {
            this.voiceStates.clear();
            for (const state of data.voice_states)
                this.voiceStates.set(state.user_id, new VoiceState_1.default(state, this.client));
        }
        if (data.emojis && Array.isArray(data.emojis)) {
            this.emojis.clear();
            for (const emoji of data.emojis)
                this.emojis.set(emoji.id || emoji.name, new Emoji_1.default(emoji, this.client));
        }
        if (data.threads && Array.isArray(data.threads)) {
            const ThreadNewsChannel = require("./ThreadNewsChannel");
            const ThreadTextChannel = require("./ThreadTextChannel");
            this.threads.clear();
            for (const thread of data.threads)
                this.threads.set(thread.id, [11, 12].includes(thread.type) ? new ThreadTextChannel(thread, this.client) : new ThreadNewsChannel(thread, this.client));
        }
        super._patch(data);
    }
}
module.exports = Guild;

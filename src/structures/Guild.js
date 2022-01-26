"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Constants_1 = __importDefault(require("../util/Constants"));
const Util_1 = __importDefault(require("../util/Util"));
const AnonymousGuild_1 = __importDefault(require("./AnonymousGuild"));
const collection_1 = require("@discordjs/collection");
const Emoji_1 = __importDefault(require("./Emoji"));
const GuildMember_1 = __importDefault(require("./GuildMember"));
const Role_1 = __importDefault(require("./Role"));
const SystemChannelFlags_1 = __importDefault(require("../util/SystemChannelFlags"));
const VoiceState_1 = __importDefault(require("./VoiceState"));
const WelcomeScreen_1 = __importDefault(require("./WelcomeScreen"));
const GuildApplicationCommandManager_1 = __importDefault(require("../managers/GuildApplicationCommandManager"));
class Guild extends AnonymousGuild_1.default {
    constructor(client, data) {
        super(client, data);
        this.partial = false;
        this.name = "unknown";
        this.memberCount = 0;
        this.approximateMemberCount = 0;
        this.approximatePresenceCount = 0;
        this.ownerId = Constants_1.default.SYSTEM_USER_ID;
        this.icon = null;
        this.discoverySplash = null;
        this.large = false;
        this.applicationId = null;
        this.afkTimeout = 0;
        this.afkChannelId = null;
        this.systemChannelId = null;
        this.premiumTier = 0;
        this.premiumSubscriptionCount = 0;
        this.rulesChannelId = null;
        this.publicUpdatesChannelId = null;
        this.preferredLocale = "en-US";
        this.members = new collection_1.Collection();
        this.channels = new collection_1.Collection();
        this.roles = new collection_1.Collection();
        this.voiceStates = new collection_1.Collection();
        this.emojis = new collection_1.Collection();
        this.defaultMessageNotifications = "ALL";
        this.mfaLevel = 0;
        this.maximumMembers = 100000;
        this.maximumPresences = 25000;
        this.shardId = 0;
        this.threads = new collection_1.Collection();
        this.stageInstances = new collection_1.Collection();
        this.commands = new GuildApplicationCommandManager_1.default(this);
        if (data)
            this._patch(data);
    }
    get joinedAt() {
        return new Date(this.joinedTimestamp);
    }
    get me() {
        return new GuildMember_1.default(this.client, { guild_id: this.id, deaf: false, hoisted_role: this.id, joined_at: this.joinedAt.toISOString(), mute: false, nick: null, roles: [], user: this.client.user.toJSON() });
    }
    async fetchWelcomeScreen() {
        const data = await this.client.api.guilds(this.id, "welcome-screen").get();
        return new WelcomeScreen_1.default(this, data);
    }
    bannerURL(options = { format: "png", size: 512 }) {
        if (!this.banner)
            return null;
        return this.client.rest.cdn.Banner(this.id, this.banner, options.format, options.size);
    }
    toJSON() {
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
    async fetchMembers(options) {
        if (typeof options === "string")
            return this.client._snow.guild.getGuildMember(this.id, options).then(d => new GuildMember_1.default(this.client, d));
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
                return data.map(d => new GuildMember_1.default(this.client, d));
            else if (options.Ids)
                return data.filter(d => { var _a; return (d.user ? (_a = options.Ids) === null || _a === void 0 ? void 0 : _a.includes(d.user.id) : false); }).map(d => new GuildMember_1.default(this.client, d));
            else
                return data.filter(d => options.query && d.nick && d.nick.includes(options.query) || (d.user ? options.query && d.user.username.includes(options.query) : false) || (d.user ? options.query && d.user.id.includes(options.query) : false) || (d.user ? `${d.user.username}#${d.user.discriminator}` === options.query : false)).map(d => new GuildMember_1.default(this.client, d));
        }
    }
    async fetchInvites() {
        const Invite = require("./Invite");
        const inviteItems = await this.client._snow.guild.getGuildInvites(this.id);
        const invites = new collection_1.Collection();
        for (const inviteItem of inviteItems) {
            const invite = new Invite(this.client, inviteItem);
            invites.set(invite.code, invite);
        }
        return invites;
    }
    _patch(data) {
        super._patch(data);
        const PartialChannel = require("./Partial/PartialChannel");
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
            this.maximumPresences = data.max_presences || 0;
        if (data.owner_id)
            this.ownerId = data.owner_id;
        if (data.discovery_splash !== undefined)
            this.discoverySplash = data.discovery_splash;
        if (data.large !== undefined)
            this.large = data.large;
        if (data.application_id !== undefined)
            this.applicationId = data.application_id;
        if (data.afk_timeout !== undefined)
            this.afkTimeout = data.afk_timeout;
        if (data.afk_channel_id !== undefined)
            this.afkChannelId = data.afk_channel_id;
        if (data.system_channel_id !== undefined)
            this.systemChannelId = data.system_channel_id;
        if (data.premium_tier !== undefined)
            this.premiumTier = data.premium_tier;
        if (data.premium_subscription_count !== undefined)
            this.premiumSubscriptionCount = data.premium_subscription_count;
        if (!this.systemChannelFlags || data.system_channel_flags)
            this.systemChannelFlags = new SystemChannelFlags_1.default(data.system_channel_flags).freeze();
        if (data.rules_channel_id !== undefined)
            this.rulesChannelId = data.rules_channel_id;
        if (data.preferred_locale)
            this.preferredLocale = data.preferred_locale;
        if (data.mfa_level !== undefined)
            this.mfaLevel = data.mfa_level;
        this.owner = this.owner && data.owner_id === this.owner.id ? this.owner : new PartialUser(this.client, { id: this.ownerId });
        this.icon = data.icon || (this.icon ? this.icon : null);
        if (!this.members)
            this.members = new collection_1.Collection();
        if (data.members && Array.isArray(data.members)) {
            this.members.clear();
            data.members.forEach(member => this.members.set(member.user.id, new GuildMember_1.default(this.client, member)));
        }
        if (!this.channels)
            this.channels = new collection_1.Collection();
        if (data.channels && Array.isArray(data.channels)) {
            this.channels.clear();
            for (const channel of data.channels) {
                const chan = Util_1.default.createChannelFromData(this.client, channel);
                this.channels.set(chan.id, chan);
            }
        }
        if (!this.roles)
            this.roles = new collection_1.Collection();
        if (data.roles && Array.isArray(data.roles)) {
            this.roles.clear();
            for (const role of data.roles)
                this.roles.set(role.id, new Role_1.default(this.client, Object.assign({}, role, { guild_id: this.id })));
        }
        if (!this.voiceStates)
            this.voiceStates = new collection_1.Collection();
        if (data.voice_states && Array.isArray(data.voice_states)) {
            this.voiceStates.clear();
            for (const state of data.voice_states)
                this.voiceStates.set(state.user_id, new VoiceState_1.default(this.client, state));
        }
        if (!this.emojis)
            this.emojis = new collection_1.Collection();
        if (data.emojis && Array.isArray(data.emojis)) {
            this.emojis.clear();
            for (const emoji of data.emojis)
                this.emojis.set(emoji.id || emoji.name, new Emoji_1.default(this.client, emoji));
        }
        if (!this.threads)
            this.threads = new collection_1.Collection();
        if (data.threads && Array.isArray(data.threads)) {
            const ThreadNewsChannel = require("./ThreadNewsChannel");
            const ThreadTextChannel = require("./ThreadTextChannel");
            this.threads.clear();
            for (const thread of data.threads)
                this.threads.set(thread.id, [11, 12].includes(thread.type) ? new ThreadTextChannel(this, thread) : new ThreadNewsChannel(this, thread));
        }
        if (!this.stageInstances)
            this.stageInstances = new collection_1.Collection();
        if (data.stage_instances && Array.isArray(data.stage_instances)) {
            this.stageInstances.clear();
            for (const instance of data.stage_instances)
                this.stageInstances.set(instance.id, new PartialChannel(this.client, { id: instance.channel_id, guild_id: instance.guild_id, type: Constants_1.default.ChannelTypes[13] }));
        }
    }
}
Guild.default = Guild;
module.exports = Guild;

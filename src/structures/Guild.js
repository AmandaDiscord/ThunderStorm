"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("../util/Constants"));
const BaseGuild_1 = __importDefault(require("./BaseGuild"));
const CategoryChannel_1 = __importDefault(require("./CategoryChannel"));
const Collection_1 = __importDefault(require("../util/Collection"));
const Emoji_1 = __importDefault(require("./Emoji"));
const GuildMember_1 = __importDefault(require("./GuildMember"));
const NewsChannel_1 = __importDefault(require("./NewsChannel"));
const Role_1 = __importDefault(require("./Role"));
const StoreChannel_1 = __importDefault(require("./StoreChannel"));
const StageChannel_1 = __importDefault(require("./StageChannel"));
const SystemChannelFlags_1 = __importDefault(require("../util/SystemChannelFlags"));
const TextChannel_1 = __importDefault(require("./TextChannel"));
const VoiceChannel_1 = __importDefault(require("./VoiceChannel"));
const VoiceState_1 = __importDefault(require("./VoiceState"));
const GuildApplicationCommandManager_1 = __importDefault(require("../managers/GuildApplicationCommandManager"));
class Guild extends BaseGuild_1.default {
    constructor(client, data) {
        super(client, data);
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
        this.stageInstances = new Collection_1.default();
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
            else if (options.ids)
                return data.filter(d => { var _a; return (d.user ? (_a = options.ids) === null || _a === void 0 ? void 0 : _a.includes(d.user.id) : false); }).map(d => new GuildMember_1.default(this.client, d));
            else
                return data.filter(d => options.query && d.nick && d.nick.includes(options.query) || (d.user ? options.query && d.user.username.includes(options.query) : false) || (d.user ? options.query && d.user.id.includes(options.query) : false) || (d.user ? `${d.user.username}#${d.user.discriminator}` === options.query : false)).map(d => new GuildMember_1.default(this.client, d));
        }
    }
    async fetchInvites() {
        const Invite = require("./Invite");
        const inviteItems = await this.client._snow.guild.getGuildInvites(this.id);
        const invites = new Collection_1.default();
        for (const inviteItem of inviteItems) {
            const invite = new Invite(this.client, inviteItem);
            invites.set(invite.code, invite);
        }
        return invites;
    }
    _patch(data) {
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
        this.owner = this.owner && data.owner_id === this.owner.id ? this.owner : new PartialUser(this.client, { id: this.ownerID });
        this.icon = data.icon || (this.icon ? this.icon : null);
        if (!this.verificationLevel || data.verification_level !== undefined)
            this.verificationLevel = Constants_1.default.VerificationLevels[data.verification_level] || "NONE";
        if (data.members && Array.isArray(data.members)) {
            this.members.clear();
            data.members.forEach(member => this.members.set(member.user.id, new GuildMember_1.default(this.client, member)));
        }
        if (data.channels && Array.isArray(data.channels)) {
            this.channels.clear();
            for (const channel of data.channels) {
                let chan;
                if (channel.type === 2)
                    chan = new VoiceChannel_1.default(this, channel);
                else if (channel.type === 4)
                    chan = new CategoryChannel_1.default(this, channel);
                else if (channel.type === 5)
                    chan = new NewsChannel_1.default(this, channel);
                // @ts-ignore
                else if (channel.type === 6)
                    chan = new StoreChannel_1.default(this, channel);
                else if (channel.type === 13)
                    chan = new StageChannel_1.default(this, channel);
                else
                    chan = new TextChannel_1.default(this, channel);
                this.channels.set(chan.id, chan);
            }
        }
        if (data.roles && Array.isArray(data.roles)) {
            this.roles.clear();
            for (const role of data.roles)
                this.roles.set(role.id, new Role_1.default(this.client, Object.assign({}, role, { guild_id: this.id })));
        }
        if (data.voice_states && Array.isArray(data.voice_states)) {
            this.voiceStates.clear();
            for (const state of data.voice_states)
                this.voiceStates.set(state.user_id, new VoiceState_1.default(this.client, state));
        }
        if (data.emojis && Array.isArray(data.emojis)) {
            this.emojis.clear();
            for (const emoji of data.emojis)
                this.emojis.set(emoji.id || emoji.name, new Emoji_1.default(this.client, emoji));
        }
        if (data.threads && Array.isArray(data.threads)) {
            const ThreadNewsChannel = require("./ThreadNewsChannel");
            const ThreadTextChannel = require("./ThreadTextChannel");
            this.threads.clear();
            for (const thread of data.threads)
                this.threads.set(thread.id, [11, 12].includes(thread.type) ? new ThreadTextChannel(this, thread) : new ThreadNewsChannel(this, thread));
        }
        if (data.stage_instances && Array.isArray(data.stage_instances)) {
            this.stageInstances.clear();
            for (const instance of data.stage_instances)
                this.stageInstances.set(instance.id, new PartialChannel(this.client, instance));
        }
    }
}
module.exports = Guild;

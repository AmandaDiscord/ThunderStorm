"use strict";
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
/* eslint-disable no-shadow */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYSTEM_USER_ID = exports._cleanupSymbol = exports.PremiumTiers = exports.PrivacyLevels = exports.NSFWLevels = exports.MFALevels = exports.MessageButtonStyles = exports.MessageComponentTypes = exports.InteractionResponseTypes = exports.InteractionTypes = exports.ApplicationCommandPermissionTypes = exports.ApplicationCommandOptionTypes = exports.ApplicationCommandTypes = exports.OverwriteTypes = exports.StickerFormatTypes = exports.WebhookTypes = exports.MembershipStates = exports.DefaultMessageNotifications = exports.APIErrors = exports.VerificationLevels = exports.ExplicitContentFilterLevels = exports.Colors = exports.VoiceBasedChannelTypes = exports.ChannelTypes = exports.ClientApplicationAssetTypes = exports.ActivityTypes = exports.SystemMessageTypes = exports.MessageTypes = exports.InviteScopes = exports.PartialTypes = exports.Events = exports.Endpoints = void 0;
const Endpoints_1 = __importDefault(require("snowtransfer/dist/Endpoints"));
const errors_1 = require("../errors");
const AllowedImageFormats = ["webp", "png", "jpg", "jpeg", "gif"];
const AllowedImageSizes = Array.from({ length: 9 }, (e, i) => 2 ** (i + 4));
function makeImageUrl(root, options = { format: "png" }) {
    if (options.format && !AllowedImageFormats.includes(options.format))
        throw new errors_1.Error("IMAGE_FORMAT", options.format);
    if (options.size && !AllowedImageSizes.includes(options.size))
        throw new errors_1.RangeError("IMAGE_SIZE", options.size);
    return `${root}.${options.format || "png"}${options.size ? `?size=${options.size}` : ""}`;
}
exports.Endpoints = {
    CDN(root) {
        return {
            Emoji: (emojiId, format = "png") => `${root}/emojis/${emojiId}.${format}`,
            Asset: (name) => `${root}/assets/${name}`,
            DefaultAvatar: (discriminator) => `${root}/embed/avatars/${discriminator}.png`,
            Avatar: (userId, hash, format = "png", size, dynamic = false) => {
                if (dynamic)
                    format = hash.startsWith("a_") ? "gif" : format;
                return makeImageUrl(`${root}/avatars/${userId}/${hash}`, { format, size });
            },
            GuildMemberAvatar: (guildId, memberId, hash, format = "png", size, dynamic = false) => {
                if (dynamic && hash.startsWith("a_"))
                    format = "gif";
                return makeImageUrl(`${root}/guilds/${guildId}/users/${memberId}/avatars/${hash}`, { format, size });
            },
            Banner: (id, hash, format = "png", size, dynamic = false) => {
                if (dynamic && hash.startsWith("a_"))
                    format = "gif";
                makeImageUrl(`${root}/banners/${id}/${hash}`, { format, size });
            },
            Icon: (guildId, hash, format = "png", size, dynamic = false) => {
                if (dynamic)
                    format = hash.startsWith("a_") ? "gif" : format;
                return makeImageUrl(`${root}/icons/${guildId}/${hash}`, { format, size });
            },
            AppIcon: (clientId, hash, options = {}) => makeImageUrl(`${root}/app-icons/${clientId}/${hash}`, { size: options.size, format: options.format }),
            AppAsset: (clientId, hash, options = { format: "png" }) => makeImageUrl(`${root}/app-assets/${clientId}/${hash}`, { size: options.size, format: options.format }),
            StickerPackBanner: (bannerId, format = "png", size) => makeImageUrl(`${root}/app-assets/710982414301790216/store/${bannerId}`, { size, format }),
            GDMIcon: (channelId, hash, format = "png", size) => makeImageUrl(`${root}/channel-icons/${channelId}/${hash}`, { size, format }),
            Splash: (guildId, hash, format = "png", size) => makeImageUrl(`${root}/splashes/${guildId}/${hash}`, { size, format }),
            DiscoverySplash: (guildId, hash, format = "webp", size) => makeImageUrl(`${root}/discovery-splashes/${guildId}/${hash}`, { size, format }),
            TeamIcon: (teamId, hash, options = { format: "png" }) => makeImageUrl(`${root}/team-icons/${teamId}/${hash}`, { size: options.size, format: options.format }),
            Sticker: (stickerId, stickerFormat) => `${root}/stickers/${stickerId}.${stickerFormat === "LOTTIE" ? "json" : "png"}`,
            RoleIcon: (roleId, hash, format = "png", size) => makeImageUrl(`${root}/role-icons/${roleId}/${hash}`, { size, format })
        };
    },
    invite: (root, code) => `${root}/${code}`,
    botGateway: Endpoints_1.default.GATEWAY_BOT
};
exports.Events = {
    RATE_LIMIT: "rateLimit",
    INVALID_REQUEST_WARNING: "invalidRequestWarning",
    API_RESPONSE: "apiResponse",
    API_REQUEST: "apiRequest",
    CLIENT_READY: "ready",
    GUILD_CREATE: "guildCreate",
    GUILD_DELETE: "guildDelete",
    GUILD_UPDATE: "guildUpdate",
    GUILD_UNAVAILABLE: "guildUnavailable",
    GUILD_MEMBER_ADD: "guildMemberAdd",
    GUILD_MEMBER_REMOVE: "guildMemberRemove",
    GUILD_MEMBER_UPDATE: "guildMemberUpdate",
    GUILD_MEMBER_AVAILABLE: "guildMemberAvailable",
    GUILD_MEMBERS_CHUNK: "guildMembersChunk",
    GUILD_INTEGRATIONS_UPDATE: "guildIntegrationsUpdate",
    GUILD_ROLE_CREATE: "roleCreate",
    GUILD_ROLE_DELETE: "roleDelete",
    INVITE_CREATE: "inviteCreate",
    INVITE_DELETE: "inviteDelete",
    GUILD_ROLE_UPDATE: "roleUpdate",
    GUILD_EMOJI_CREATE: "emojiCreate",
    GUILD_EMOJI_DELETE: "emojiDelete",
    GUILD_EMOJIS_UPDATE: "emojisUpdate",
    GUILD_BAN_ADD: "guildBanAdd",
    GUILD_BAN_REMOVE: "guildBanRemove",
    CHANNEL_CREATE: "channelCreate",
    CHANNEL_DELETE: "channelDelete",
    CHANNEL_UPDATE: "channelUpdate",
    CHANNEL_PINS_UPDATE: "channelPinsUpdate",
    MESSAGE_CREATE: "messageCreate",
    MESSAGE_DELETE: "messageDelete",
    MESSAGE_UPDATE: "messageUpdate",
    MESSAGE_BULK_DELETE: "messageDeleteBulk",
    MESSAGE_REACTION_ADD: "messageReactionAdd",
    MESSAGE_REACTION_REMOVE: "messageReactionRemove",
    MESSAGE_REACTION_REMOVE_ALL: "messageReactionRemoveAll",
    MESSAGE_REACTION_REMOVE_EMOJI: "messageReactionRemoveEmoji",
    THREAD_CREATE: "threadCreate",
    THREAD_DELETE: "threadDelete",
    THREAD_UPDATE: "threadUpdate",
    THREAD_LIST_SYNC: "threadListSync",
    THREAD_MEMBER_UPDATE: "threadMemberUpdate",
    THREAD_MEMBERS_UPDATE: "threadMembersUpdate",
    USER_UPDATE: "userUpdate",
    PRESENCE_UPDATE: "presenceUpdate",
    VOICE_SERVER_UPDATE: "voiceServerUpdate",
    VOICE_STATE_UPDATE: "voiceStateUpdate",
    TYPING_START: "typingStart",
    WEBHOOKS_UPDATE: "webhookUpdate",
    INTERACTION_CREATE: "interactionCreate",
    ERROR: "error",
    WARN: "warn",
    DEBUG: "debug",
    SHARD_DISCONNECT: "shardDisconnect",
    SHARD_ERROR: "shardError",
    SHARD_RECONNECTING: "shardReconnecting",
    SHARD_READY: "shardReady",
    SHARD_RESUME: "shardResume",
    INVALIDATED: "invalidated",
    RAW: "raw",
    STAGE_INSTANCE_CREATE: "stageInstanceCreate",
    STAGE_INSTANCE_UPDATE: "stageInstanceUpdate",
    STAGE_INSTANCE_DELETE: "stageInstanceDelete",
    GUILD_STICKER_CREATE: "stickerCreate",
    GUILD_STICKER_DELETE: "stickerDelete",
    GUILD_STICKER_UPDATE: "stickerUpdate"
};
exports.PartialTypes = {
    USER: "USER",
    CHANNEL: "CHANNEL",
    GUILD_MEMBER: "GUILD_MEMBER",
    MESSAGE: "MESSAGE",
    REACTION: "REACTION"
};
exports.InviteScopes = [
    "applications.builds.read",
    "applications.commands",
    "applications.entitlements",
    "applications.store.update",
    "connections",
    "email",
    "identity",
    "guilds",
    "guilds.join",
    "gdm.join",
    "webhook.incoming"
];
exports.MessageTypes = [
    "DEFAULT",
    "RECIPIENT_ADD",
    "RECIPIENT_REMOVE",
    "CALL",
    "CHANNEL_NAME_CHANGE",
    "CHANNEL_ICON_CHANGE",
    "PINS_ADD",
    "GUILD_MEMBER_JOIN",
    "USER_PREMIUM_GUILD_SUBSCRIPTION",
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1",
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2",
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3",
    "CHANNEL_FOLLOW_ADD",
    null,
    "GUILD_DISCOVERY_DISQUALIFIED",
    "GUILD_DISCOVERY_REQUALIFIED",
    "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING",
    "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING",
    null,
    "REPLY",
    "CHAT_INPUT_COMMAND",
    "THREAD_STARTER_MESSAGE",
    "GUILD_INVITE_REMINDER",
    "CONTEXT_MENU_COMMAND"
];
exports.SystemMessageTypes = exports.MessageTypes.filter(type => type && !["DEFAULT", "REPLY", "CHAT_INPUT_COMMAND", "CONTEXT_MENU_COMMAND"].includes(type));
exports.ActivityTypes = ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "CUSTOM_STATUS", "COMPETING"];
exports.ClientApplicationAssetTypes = {
    SMALL: 1,
    BIG: 2
};
exports.ChannelTypes = enumerate({
    UNKNOWN: -1,
    GUILD_TEXT: 0,
    DM: 1,
    GUILD_VOICE: 2,
    GUILD_CATEGORY: 4,
    GUILD_NEWS: 5,
    GUILD_STORE: 6,
    GUILD_NEWS_THREAD: 10,
    GUILD_PUBLIC_THREAD: 11,
    GUILD_PRIVATE_THREAD: 12,
    GUILD_STAGE_VOICE: 13
});
exports.VoiceBasedChannelTypes = enumerate({
    GUILD_VOICE: 2,
    GUILD_STAGE_VOICE: 13
});
exports.Colors = {
    DEFAULT: 0x000000,
    WHITE: 0xffffff,
    AQUA: 0x1abc9c,
    GREEN: 0x2ecc71,
    BLUE: 0x3498db,
    YELLOW: 0xffff00,
    PURPLE: 0x9b59b6,
    LUMINOUS_VIVID_PINK: 0xe91e63,
    GOLD: 0xf1c40f,
    ORANGE: 0xe67e22,
    RED: 0xe74c3c,
    GREY: 0x95a5a6,
    NAVY: 0x34495e,
    DARK_AQUA: 0x11806a,
    DARK_GREEN: 0x1f8b4c,
    DARK_BLUE: 0x206694,
    DARK_PURPLE: 0x71368a,
    DARK_VIVID_PINK: 0xad1457,
    DARK_GOLD: 0xc27c0e,
    DARK_ORANGE: 0xa84300,
    DARK_RED: 0x992d22,
    DARK_GREY: 0x979c9f,
    DARKER_GREY: 0x7f8c8d,
    LIGHT_GREY: 0xbcc0c0,
    DARK_NAVY: 0x2c3e50,
    BLURPLE: 0x7289da,
    GREYPLE: 0x99aab5,
    DARK_BUT_NOT_BLACK: 0x2c2f33,
    NOT_QUITE_BLACK: 0x23272a,
    RANDOM: 0xD // XD. Replaced at runtime when used natively
};
exports.ExplicitContentFilterLevels = ["DISABLED", "MEMBERS_WITHOUT_ROLES", "ALL_MEMBERS"];
exports.VerificationLevels = ["NONE", "LOW", "MEDIUM", "HIGH", "VERY_HIGH"];
exports.APIErrors = {
    UNKNOWN_ACCOUNT: 10001,
    UNKNOWN_APPLICATION: 10002,
    UNKNOWN_CHANNEL: 10003,
    UNKNOWN_GUILD: 10004,
    UNKNOWN_INTEGRATION: 10005,
    UNKNOWN_INVITE: 10006,
    UNKNOWN_MEMBER: 10007,
    UNKNOWN_MESSAGE: 10008,
    UNKNOWN_OVERWRITE: 10009,
    UNKNOWN_PROVIDER: 10010,
    UNKNOWN_ROLE: 10011,
    UNKNOWN_TOKEN: 10012,
    UNKNOWN_USER: 10013,
    UNKNOWN_EMOJI: 10014,
    UNKNOWN_WEBHOOK: 10015,
    UNKNOWN_WEBHOOK_SERVICE: 10016,
    UNKNOWN_SESSION: 10020,
    UNKNOWN_BAN: 10026,
    UNKNOWN_SKU: 10027,
    UNKNOWN_STORE_LISTING: 10028,
    UNKNOWN_ENTITLEMENT: 10029,
    UNKNOWN_BUILD: 10030,
    UNKNOWN_LOBBY: 10031,
    UNKNOWN_BRANCH: 10032,
    UNKNOWN_STORE_DIRECTORY_LAYOUT: 10033,
    UNKNOWN_REDISTRIBUTABLE: 10036,
    UNKNOWN_GIFT_CODE: 10038,
    UNKNOWN_STREAM: 10049,
    UNKNOWN_PREMIUM_SERVER_SUBSCRIBE_COOLDOWN: 10050,
    UNKNOWN_GUILD_TEMPLATE: 10057,
    UNKNOWN_DISCOVERABLE_SERVER_CATEGORY: 10059,
    UNKNOWN_STICKER: 10060,
    UNKNOWN_INTERACTION: 10062,
    UNKNOWN_APPLICATION_COMMAND: 10063,
    UNKNOWN_APPLICATION_COMMAND_PERMISSIONS: 10066,
    UNKNOWN_STAGE_INSTANCE: 10067,
    UNKNOWN_GUILD_MEMBER_VERIFICATION_FORM: 10068,
    UNKNOWN_GUILD_WELCOME_SCREEN: 10069,
    UNKNOWN_GUILD_SCHEDULED_EVENT: 10070,
    UNKNOWN_GUILD_SCHEDULED_EVENT_USER: 10071,
    BOT_PROHIBITED_ENDPOINT: 20001,
    BOT_ONLY_ENDPOINT: 20002,
    CANNOT_SEND_EXPLICIT_CONTENT: 20009,
    NOT_AUTHORIZED: 20012,
    SLOWMODE_RATE_LIMIT: 20016,
    ACCOUNT_OWNER_ONLY: 20018,
    ANNOUNCEMENT_EDIT_LIMIT_EXCEEDED: 20022,
    CHANNEL_HIT_WRITE_RATELIMIT: 20028,
    CONTENT_NOT_ALLOWED: 20031,
    GUILD_PREMIUM_LEVEL_TOO_LOW: 20035,
    MAXIMUM_GUILDS: 30001,
    MAXIMUM_FRIENDS: 30002,
    MAXIMUM_PINS: 30003,
    MAXIMUM_RECIPIENTS: 30004,
    MAXIMUM_ROLES: 30005,
    MAXIMUM_WEBHOOKS: 30007,
    MAXIMUM_EMOJIS: 30008,
    MAXIMUM_REACTIONS: 30010,
    MAXIMUM_CHANNELS: 30013,
    MAXIMUM_ATTACHMENTS: 30015,
    MAXIMUM_INVITES: 30016,
    MAXIMUM_ANIMATED_EMOJIS: 30018,
    MAXIMUM_SERVER_MEMBERS: 30019,
    MAXIMUM_NUMBER_OF_SERVER_CATEGORIES: 30030,
    GUILD_ALREADY_HAS_TEMPLATE: 30031,
    MAXIMUM_THREAD_PARTICIPANTS: 30033,
    MAXIMUM_NON_GUILD_MEMBERS_BANS: 30035,
    MAXIMUM_BAN_FETCHES: 30037,
    MAXIMUM_NUMBER_OF_STICKERS_REACHED: 30039,
    MAXIMUM_PRUNE_REQUESTS: 30040,
    MAXIMUM_GUILD_WIDGET_SETTINGS_UPDATE: 30042,
    UNAUTHORIZED: 40001,
    ACCOUNT_VERIFICATION_REQUIRED: 40002,
    DIRECT_MESSAGES_TOO_FAST: 40003,
    REQUEST_ENTITY_TOO_LARGE: 40005,
    FEATURE_TEMPORARILY_DISABLED: 40006,
    USER_BANNED: 40007,
    TARGET_USER_NOT_CONNECTED_TO_VOICE: 40032,
    ALREADY_CROSSPOSTED: 40033,
    MISSING_ACCESS: 50001,
    INVALID_ACCOUNT_TYPE: 50002,
    CANNOT_EXECUTE_ON_DM: 50003,
    EMBED_DISABLED: 50004,
    CANNOT_EDIT_MESSAGE_BY_OTHER: 50005,
    CANNOT_SEND_EMPTY_MESSAGE: 50006,
    CANNOT_MESSAGE_USER: 50007,
    CANNOT_SEND_MESSAGES_IN_VOICE_CHANNEL: 50008,
    CHANNEL_VERIFICATION_LEVEL_TOO_HIGH: 50009,
    OAUTH2_APPLICATION_BOT_ABSENT: 50010,
    MAXIMUM_OAUTH2_APPLICATIONS: 50011,
    INVALID_OAUTH_STATE: 50012,
    MISSING_PERMISSIONS: 50013,
    INVALID_AUTHENTICATION_TOKEN: 50014,
    NOTE_TOO_LONG: 50015,
    INVALID_BULK_DELETE_QUANTITY: 50016,
    CANNOT_PIN_MESSAGE_IN_OTHER_CHANNEL: 50019,
    INVALID_OR_TAKEN_INVITE_CODE: 50020,
    CANNOT_EXECUTE_ON_SYSTEM_MESSAGE: 50021,
    CANNOT_EXECUTE_ON_CHANNEL_TYPE: 50024,
    INVALID_OAUTH_TOKEN: 50025,
    MISSING_OAUTH_SCOPE: 50026,
    INVALID_WEBHOOK_TOKEN: 50027,
    INVALID_ROLE: 50028,
    INVALID_RECIPIENTS: 50033,
    BULK_DELETE_MESSAGE_TOO_OLD: 50034,
    INVALID_FORM_BODY: 50035,
    INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT: 50036,
    INVALID_API_VERSION: 50041,
    FILE_UPLOADED_EXCEEDS_MAXIMUM_SIZE: 50045,
    INVALID_FILE_UPLOADED: 50046,
    CANNOT_SELF_REDEEM_GIFT: 50054,
    PAYMENT_SOURCE_REQUIRED: 50070,
    CANNOT_DELETE_COMMUNITY_REQUIRED_CHANNEL: 50074,
    INVALID_STICKER_SENT: 50081,
    INVALID_OPERATION_ON_ARCHIVED_THREAD: 50083,
    INVALID_THREAD_NOTIFICATION_SETTINGS: 50084,
    PARAMETER_EARLIER_THAN_CREATION: 50085,
    GUILD_NOT_AVAILABLE_IN_LOCATION: 50095,
    GUILD_MONETIZATION_REQUIRED: 50097,
    INSUFFICIENT_BOOSTS: 50101,
    TWO_FACTOR_REQUIRED: 60003,
    NO_USERS_WITH_DISCORDTAG_EXIST: 80004,
    REACTION_BLOCKED: 90001,
    RESOURCE_OVERLOADED: 130000,
    STAGE_ALREADY_OPEN: 150006,
    CANNOT_REPLY_WITHOUT_READ_MESSAGE_HISTORY_PERMISSION: 160002,
    MESSAGE_ALREADY_HAS_THREAD: 160004,
    THREAD_LOCKED: 160005,
    MAXIMUM_ACTIVE_THREADS: 160006,
    MAXIMUM_ACTIVE_ANNOUNCEMENT_THREADS: 160007,
    INVALID_JSON_FOR_UPLOADED_LOTTIE_FILE: 170001,
    UPLOADED_LOTTIES_CANNOT_CONTAIN_RASTERIZED_IMAGES: 170002,
    STICKER_MAXIMUM_FRAMERATE_EXCEEDED: 170003,
    STICKER_FRAME_COUNT_EXCEEDS_MAXIMUM_OF_1000_FRAMES: 170004,
    LOTTIE_ANIMATION_MAXIMUM_DIMENSIONS_EXCEEDED: 170005,
    STICKER_FRAME_RATE_IS_TOO_SMALL_OR_TOO_LARGE: 170006,
    STICKER_ANIMATION_DURATION_EXCEEDS_MAXIMUM_OF_5_SECONDS: 170007
};
exports.DefaultMessageNotifications = ["ALL", "MENTIONS"];
exports.MembershipStates = [
    null,
    "INVITED",
    "ACCEPTED"
];
exports.WebhookTypes = [
    null,
    "Incoming",
    "Channel Follower",
    "Application"
];
exports.StickerFormatTypes = enumerate({
    PNG: 1,
    APNG: 2,
    LOTTIE: 3
});
exports.OverwriteTypes = enumerate({
    role: 0,
    member: 1
});
exports.ApplicationCommandTypes = enumerate({
    CHAT_INPUT: 1,
    USER: 2,
    MESSAGE: 3
});
exports.ApplicationCommandOptionTypes = enumerate({
    SUB_COMMAND: 1,
    SUB_COMMAND_GROUP: 2,
    STRING: 3,
    INTEGER: 4,
    BOOLEAN: 5,
    USER: 6,
    CHANNEL: 7,
    ROLE: 8,
    MENTIONABLE: 9,
    NUMBER: 10
});
exports.ApplicationCommandPermissionTypes = enumerate({
    ROLE: 1,
    USER: 2
});
exports.InteractionTypes = enumerate({
    PING: 1,
    APPLICATION_COMMAND: 2,
    MESSAGE_COMPONENT: 3,
    APPLICATION_COMMAND_AUTOCOMPLETE: 4
});
exports.InteractionResponseTypes = enumerate({
    PONG: 1,
    CHANNEL_MESSAGE_WITH_SOURCE: 4,
    DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5,
    DEFERRED_MESSAGE_UPDATE: 6,
    UPDATE_MESSAGE: 7,
    APPLICATION_COMMAND_AUTOCOMPLETE_RESULT: 8
});
exports.MessageComponentTypes = enumerate({
    ACTION_ROW: 1,
    BUTTON: 2,
    SELECT_MENU: 3
});
exports.MessageButtonStyles = enumerate({
    PRIMARY: 1,
    SECONDARY: 2,
    SUCCESS: 3,
    DANGER: 4,
    LINK: 5
});
exports.MFALevels = enumerate({
    NONE: 0,
    ELEVATED: 1
});
exports.NSFWLevels = enumerate({
    DEFAULT: 0,
    EXPLICIT: 1,
    SAFE: 2,
    AGE_RESTRICTED: 3
});
exports.PrivacyLevels = enumerate({
    PUBLIC: 1,
    GUILD_ONLY: 2
});
exports.PremiumTiers = enumerate({
    NONE: 0,
    TIER_1: 1,
    TIER_2: 2,
    TIER_3: 3
});
exports._cleanupSymbol = Symbol("djsCleanup");
exports.SYSTEM_USER_ID = "643945264868098049";
function enumerate(obj) {
    const entries = Object.entries(obj);
    const mirror = {};
    for (const [key, value] of entries) {
        mirror[value] = key;
    }
    return Object.assign(obj, mirror);
}
exports.default = exports;

// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
/* eslint-disable no-shadow */

import STEndpoints from "snowtransfer/dist/Endpoints";

import { Error, RangeError } from "../errors";

const AllowedImageFormats: Array<import("../Types").AllowedImageFormat> = ["webp", "png", "jpg", "jpeg", "gif"];

const AllowedImageSizes: Array<import("../Types").ImageSize> = Array.from({ length: 9 }, (e, i) => 2 ** (i + 4) as import("../Types").ImageSize);

function makeImageUrl(root: string, options: { format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize } = { format: "png" }) {
	if (options.format && !AllowedImageFormats.includes(options.format)) throw new Error("IMAGE_FORMAT", options.format);
	if (options.size && !AllowedImageSizes.includes(options.size)) throw new RangeError("IMAGE_SIZE", options.size);
	return `${root}.${options.format || "png"}${options.size ? `?size=${options.size}` : ""}`;
}

export const Endpoints = {
	CDN(root: string) {
		return {
			Emoji: (emojiId: string, format: import("../Types").AllowedImageFormat = "png") => `${root}/emojis/${emojiId}.${format}`,
			Asset: (name: string) => `${root}/assets/${name}`,
			DefaultAvatar: (discriminator: number) => `${root}/embed/avatars/${discriminator}.png`,
			Avatar: (userId: string, hash: string, format: import("../Types").AllowedImageFormat = "png", size?: import("../Types").ImageSize, dynamic = false) => {
				if (dynamic) format = hash.startsWith("a_") ? "gif" : format;
				return makeImageUrl(`${root}/avatars/${userId}/${hash}`, { format, size });
			},
			GuildMemberAvatar: (guildId: string, memberId: string, hash: string, format: import("../Types").AllowedImageFormat = "png", size?: import("../Types").ImageSize, dynamic = false) => {
				if (dynamic && hash.startsWith("a_")) format = "gif";
				return makeImageUrl(`${root}/guilds/${guildId}/users/${memberId}/avatars/${hash}`, { format, size });
			},
			Banner: (id: string, hash: string, format: import("../Types").AllowedImageFormat = "png", size?: import("../Types").ImageSize, dynamic = false) => {
				if (dynamic && hash.startsWith("a_")) format = "gif";
				makeImageUrl(`${root}/banners/${id}/${hash}`, { format, size });
			},
			Icon: (guildId: string, hash: string, format: import("../Types").AllowedImageFormat = "png", size?: import("../Types").ImageSize, dynamic = false) => {
				if (dynamic) format = hash.startsWith("a_") ? "gif" : format;
				return makeImageUrl(`${root}/icons/${guildId}/${hash}`, { format, size });
			},
			AppIcon: (clientId: string, hash: string, options: { format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize } = {}) =>
				makeImageUrl(`${root}/app-icons/${clientId}/${hash}`, { size: options.size, format: options.format }),
			AppAsset: (clientId: string, hash: string, options: { format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize } = { format: "png" }) =>
				makeImageUrl(`${root}/app-assets/${clientId}/${hash}`, { size: options.size, format: options.format }),
			StickerPackBanner: (bannerId: string, format: import("../Types").AllowedImageFormat = "png", size?: import("../Types").ImageSize) =>
				makeImageUrl(`${root}/app-assets/710982414301790216/store/${bannerId}`, { size, format }),
			GDMIcon: (channelId: string, hash: string, format: import("../Types").AllowedImageFormat = "png", size?: import("../Types").ImageSize) =>
				makeImageUrl(`${root}/channel-icons/${channelId}/${hash}`, { size, format }),
			Splash: (guildId: string, hash: string, format: import("../Types").AllowedImageFormat = "png", size?: import("../Types").ImageSize) =>
				makeImageUrl(`${root}/splashes/${guildId}/${hash}`, { size, format }),
			DiscoverySplash: (guildId: string, hash: string, format: import("../Types").AllowedImageFormat = "webp", size?: import("../Types").ImageSize) =>
				makeImageUrl(`${root}/discovery-splashes/${guildId}/${hash}`, { size, format }),
			TeamIcon: (teamId: string, hash: string, options: { format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize } = { format: "png" }) =>
				makeImageUrl(`${root}/team-icons/${teamId}/${hash}`, { size: options.size, format: options.format }),
			Sticker: (stickerId: string, stickerFormat: "LOTTIE" | "png") =>
				`${root}/stickers/${stickerId}.${stickerFormat === "LOTTIE" ? "json" : "png"}`,
			RoleIcon: (roleId: string, hash: string, format: import("../Types").AllowedImageFormat = "png", size?: import("../Types").ImageSize) =>
				makeImageUrl(`${root}/role-icons/${roleId}/${hash}`, { size, format })
		};
	},
	invite: (root: string, code: string) => `${root}/${code}`,
	botGateway: STEndpoints.GATEWAY_BOT
};

export const Events = {
	RATE_LIMIT: "rateLimit" as const,
	INVALID_REQUEST_WARNING: "invalidRequestWarning" as const,
	API_RESPONSE: "apiResponse" as const,
	API_REQUEST: "apiRequest" as const,
	CLIENT_READY: "ready" as const,
	GUILD_CREATE: "guildCreate" as const,
	GUILD_DELETE: "guildDelete" as const,
	GUILD_UPDATE: "guildUpdate" as const,
	GUILD_UNAVAILABLE: "guildUnavailable" as const,
	GUILD_MEMBER_ADD: "guildMemberAdd" as const,
	GUILD_MEMBER_REMOVE: "guildMemberRemove" as const,
	GUILD_MEMBER_UPDATE: "guildMemberUpdate" as const,
	GUILD_MEMBER_AVAILABLE: "guildMemberAvailable" as const,
	GUILD_MEMBERS_CHUNK: "guildMembersChunk" as const,
	GUILD_INTEGRATIONS_UPDATE: "guildIntegrationsUpdate" as const,
	GUILD_ROLE_CREATE: "roleCreate" as const,
	GUILD_ROLE_DELETE: "roleDelete" as const,
	INVITE_CREATE: "inviteCreate" as const,
	INVITE_DELETE: "inviteDelete" as const,
	GUILD_ROLE_UPDATE: "roleUpdate" as const,
	GUILD_EMOJI_CREATE: "emojiCreate" as const,
	GUILD_EMOJI_DELETE: "emojiDelete" as const,
	GUILD_EMOJIS_UPDATE: "emojisUpdate" as const,
	GUILD_BAN_ADD: "guildBanAdd" as const,
	GUILD_BAN_REMOVE: "guildBanRemove" as const,
	CHANNEL_CREATE: "channelCreate" as const,
	CHANNEL_DELETE: "channelDelete" as const,
	CHANNEL_UPDATE: "channelUpdate" as const,
	CHANNEL_PINS_UPDATE: "channelPinsUpdate" as const,
	MESSAGE_CREATE: "messageCreate" as const,
	MESSAGE_DELETE: "messageDelete" as const,
	MESSAGE_UPDATE: "messageUpdate" as const,
	MESSAGE_BULK_DELETE: "messageDeleteBulk" as const,
	MESSAGE_REACTION_ADD: "messageReactionAdd" as const,
	MESSAGE_REACTION_REMOVE: "messageReactionRemove" as const,
	MESSAGE_REACTION_REMOVE_ALL: "messageReactionRemoveAll" as const,
	MESSAGE_REACTION_REMOVE_EMOJI: "messageReactionRemoveEmoji" as const,
	THREAD_CREATE: "threadCreate" as const,
	THREAD_DELETE: "threadDelete" as const,
	THREAD_UPDATE: "threadUpdate" as const,
	THREAD_LIST_SYNC: "threadListSync" as const,
	THREAD_MEMBER_UPDATE: "threadMemberUpdate" as const,
	THREAD_MEMBERS_UPDATE: "threadMembersUpdate" as const,
	USER_UPDATE: "userUpdate" as const,
	PRESENCE_UPDATE: "presenceUpdate" as const,
	VOICE_SERVER_UPDATE: "voiceServerUpdate" as const,
	VOICE_STATE_UPDATE: "voiceStateUpdate" as const,
	TYPING_START: "typingStart" as const,
	WEBHOOKS_UPDATE: "webhookUpdate" as const,
	INTERACTION_CREATE: "interactionCreate" as const,
	ERROR: "error" as const,
	WARN: "warn" as const,
	DEBUG: "debug" as const,
	SHARD_DISCONNECT: "shardDisconnect" as const,
	SHARD_ERROR: "shardError" as const,
	SHARD_RECONNECTING: "shardReconnecting" as const,
	SHARD_READY: "shardReady" as const,
	SHARD_RESUME: "shardResume" as const,
	INVALIDATED: "invalidated" as const,
	RAW: "raw" as const,
	STAGE_INSTANCE_CREATE: "stageInstanceCreate" as const,
	STAGE_INSTANCE_UPDATE: "stageInstanceUpdate" as const,
	STAGE_INSTANCE_DELETE: "stageInstanceDelete" as const,
	GUILD_STICKER_CREATE: "stickerCreate" as const,
	GUILD_STICKER_DELETE: "stickerDelete" as const,
	GUILD_STICKER_UPDATE: "stickerUpdate" as const
};

export const PartialTypes = {
	USER: "USER" as const,
	CHANNEL: "CHANNEL" as const,
	GUILD_MEMBER: "GUILD_MEMBER" as const,
	MESSAGE: "MESSAGE" as const,
	REACTION: "REACTION" as const
};

export const InviteScopes = [
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
] as const;

export const MessageTypes = [
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
	"APPLICATION_COMMAND",
	"THREAD_STARTER_MESSAGE",
	"GUILD_INVITE_REMINDER"
] as const;

export const SystemMessageTypes = MessageTypes.filter(type => type && !["DEFAULT", "REPLY", "APPLICATION_COMMAND"].includes(type)) as ["RECIPIENT_ADD", "RECIPIENT_REMOVE", "CALL", "CHANNEL_NAME_CHANGE", "CHANNEL_ICON_CHANGE", "PINS_ADD", "GUILD_MEMBER_JOIN", "USER_PREMIUM_GUILD_SUBSCRIPTION", "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1", "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2", "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3", "CHANNEL_FOLLOW_ADD", null, "GUILD_DISCOVERY_DISQUALIFIED", "GUILD_DISCOVERY_REQUALIFIED", "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING", "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING", null, "THREAD_STARTER_MESSAGE", "GUILD_INVITE_REMINDER"];

export const ActivityTypes = ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "CUSTOM_STATUS", "COMPETING"] as const;

export const ClientApplicationAssetTypes = {
	SMALL: 1 as const,
	BIG: 2 as const
};

export const ChannelTypes = enumerate({
	UNKNOWN: -1 as const,
	GUILD_TEXT: 0 as const,
	DM: 1 as const,
	GUILD_VOICE: 2 as const,
	GUILD_CATEGORY: 4 as const,
	GUILD_NEWS: 5 as const,
	GUILD_STORE: 6 as const,
	GUILD_NEWS_THREAD: 10 as const,
	GUILD_PUBLIC_THREAD: 11 as const,
	GUILD_PRIVATE_THREAD: 12 as const,
	GUILD_STAGE_VOICE: 13 as const
});

export const VoiceBasedChannelTypes = enumerate({
	GUILD_VOICE: 2 as const,
	GUILD_STAGE_VOICE: 13 as const
});

export const Colors = {
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

export const ExplicitContentFilterLevels = ["DISABLED", "MEMBERS_WITHOUT_ROLES", "ALL_MEMBERS"] as const;

export const VerificationLevels = ["NONE", "LOW", "MEDIUM", "HIGH", "VERY_HIGH"] as const;

export const APIErrors = {
	UNKNOWN_ACCOUNT: 10001 as const,
	UNKNOWN_APPLICATION: 10002 as const,
	UNKNOWN_CHANNEL: 10003 as const,
	UNKNOWN_GUILD: 10004 as const,
	UNKNOWN_INTEGRATION: 10005 as const,
	UNKNOWN_INVITE: 10006 as const,
	UNKNOWN_MEMBER: 10007 as const,
	UNKNOWN_MESSAGE: 10008 as const,
	UNKNOWN_OVERWRITE: 10009 as const,
	UNKNOWN_PROVIDER: 10010 as const,
	UNKNOWN_ROLE: 10011 as const,
	UNKNOWN_TOKEN: 10012 as const,
	UNKNOWN_USER: 10013 as const,
	UNKNOWN_EMOJI: 10014 as const,
	UNKNOWN_WEBHOOK: 10015 as const,
	UNKNOWN_BAN: 10026 as const,
	UNKNOWN_GUILD_TEMPLATE: 10057 as const,
	BOT_PROHIBITED_ENDPOINT: 20001 as const,
	BOT_ONLY_ENDPOINT: 20002 as const,
	ANNOUNCEMENT_EDIT_LIMIT_EXCEEDED: 20022 as const,
	CHANNEL_HIT_WRITE_RATELIMIT: 20028 as const,
	MAXIMUM_GUILDS: 30001 as const,
	MAXIMUM_FRIENDS: 30002 as const,
	MAXIMUM_PINS: 30003 as const,
	MAXIMUM_ROLES: 30005 as const,
	MAXIMUM_WEBHOOKS: 30007 as const,
	MAXIMUM_REACTIONS: 30010 as const,
	MAXIMUM_CHANNELS: 30013 as const,
	MAXIMUM_ATTACHMENTS: 30015 as const,
	MAXIMUM_INVITES: 30016 as const,
	GUILD_ALREADY_HAS_TEMPLATE: 30031 as const,
	UNAUTHORIZED: 40001 as const,
	ACCOUNT_VERIFICATION_REQUIRED: 40002 as const,
	REQUEST_ENTITY_TOO_LARGE: 40005 as const,
	FEATURE_TEMPORARILY_DISABLED: 40006 as const,
	USER_BANNED: 40007 as const,
	ALREADY_CROSSPOSTED: 40033 as const,
	MISSING_ACCESS: 50001 as const,
	INVALID_ACCOUNT_TYPE: 50002 as const,
	CANNOT_EXECUTE_ON_DM: 50003 as const,
	EMBED_DISABLED: 50004 as const,
	CANNOT_EDIT_MESSAGE_BY_OTHER: 50005 as const,
	CANNOT_SEND_EMPTY_MESSAGE: 50006 as const,
	CANNOT_MESSAGE_USER: 50007 as const,
	CANNOT_SEND_MESSAGES_IN_VOICE_CHANNEL: 50008 as const,
	CHANNEL_VERIFICATION_LEVEL_TOO_HIGH: 50009 as const,
	OAUTH2_APPLICATION_BOT_ABSENT: 50010 as const,
	MAXIMUM_OAUTH2_APPLICATIONS: 50011 as const,
	INVALID_OAUTH_STATE: 50012 as const,
	MISSING_PERMISSIONS: 50013 as const,
	INVALID_AUTHENTICATION_TOKEN: 50014 as const,
	NOTE_TOO_LONG: 50015 as const,
	INVALID_BULK_DELETE_QUANTITY: 50016 as const,
	CANNOT_PIN_MESSAGE_IN_OTHER_CHANNEL: 50019 as const,
	INVALID_OR_TAKEN_INVITE_CODE: 50020 as const,
	CANNOT_EXECUTE_ON_SYSTEM_MESSAGE: 50021 as const,
	CANNOT_EXECUTE_ON_CHANNEL_TYPE: 50024 as const,
	INVALID_OAUTH_TOKEN: 50025 as const,
	INVALID_RECIPIENTS: 50033 as const,
	BULK_DELETE_MESSAGE_TOO_OLD: 50034 as const,
	INVALID_FORM_BODY: 50035 as const,
	INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT: 50036 as const,
	INVALID_API_VERSION: 50041 as const,
	CANNOT_DELETE_COMMUNITY_REQUIRED_CHANNEL: 50074 as const,
	INVALID_STICKER_SENT: 50081 as const,
	REACTION_BLOCKED: 90001 as const,
	RESOURCE_OVERLOADED: 130000 as const
};

export const DefaultMessageNotifications = ["ALL", "MENTIONS"] as const;

export const MembershipStates = [
	null,
	"INVITED",
	"ACCEPTED"
] as const;

export const WebhookTypes = [
	null,
	"Incoming",
	"Channel Follower",
	"Application"
] as const;

export const StickerFormatTypes = enumerate({
	PNG: 1 as const,
	APNG: 2 as const,
	LOTTIE: 3 as const
});

export const OverwriteTypes = enumerate({
	role: 0 as const,
	member: 1 as const
});

export const ApplicationCommandTypes = enumerate({
	CHAT_INPUT: 1 as const,
	USER: 2 as const,
	MESSAGE: 3 as const
});

export const ApplicationCommandOptionTypes = enumerate({
	SUB_COMMAND: 1 as const,
	SUB_COMMAND_GROUP: 2 as const,
	STRING: 3 as const,
	INTEGER: 4 as const,
	BOOLEAN: 5 as const,
	USER: 6 as const,
	CHANNEL: 7 as const,
	ROLE: 8 as const,
	MENTIONABLE: 9 as const,
	NUMBER: 10 as const
});

export const ApplicationCommandPermissionTypes = enumerate({
	ROLE: 1 as const,
	USER: 2 as const
});

export const InteractionTypes = enumerate({
	PING: 1 as const,
	APPLICATION_COMMAND: 2 as const,
	MESSAGE_COMPONENT: 3 as const,
	APPLICATION_COMMAND_AUTOCOMPLETE: 4 as const
});

export const InteractionResponseTypes = enumerate({
	PONG: 1 as const,
	CHANNEL_MESSAGE_WITH_SOURCE: 4 as const,
	DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5 as const,
	DEFERRED_MESSAGE_UPDATE: 6 as const,
	UPDATE_MESSAGE: 7 as const,
	APPLICATION_COMMAND_AUTOCOMPLETE_RESULT: 8 as const
});

export const MessageComponentTypes = enumerate({
	ACTION_ROW: 1 as const,
	BUTTON: 2 as const,
	SELECT_MENU: 3 as const
});

export const MessageButtonStyles = enumerate({
	PRIMARY: 1 as const,
	SECONDARY: 2 as const,
	SUCCESS: 3 as const,
	DANGER: 4 as const,
	LINK: 5 as const
});

export const MFALevels = enumerate({
	NONE: 0 as const,
	ELEVATED: 1 as const
});

export const NSFWLevels = enumerate({
	DEFAULT: 0 as const,
	EXPLICIT: 1 as const,
	SAFE: 2 as const,
	AGE_RESTRICTED: 3 as const
});

export const PrivacyLevels = enumerate({
	PUBLIC: 1 as const,
	GUILD_ONLY: 2 as const
});

export const PremiumTiers = enumerate({
	NONE: 0 as const,
	TIER_1: 1 as const,
	TIER_2: 2 as const,
	TIER_3: 3 as const
});

export const _cleanupSymbol = Symbol("djsCleanup");

export const SYSTEM_USER_ID = "643945264868098049";

type KeyFromVal<T, V> = {
	[K in keyof T]: V extends T[K] ? K : never
}[keyof T];

type Inverse<M extends Record<string, number>> = {
	[K in M[keyof M]]: KeyFromVal<M, K>
};

function enumerate<T extends Record<string, number>>(obj: T): T & Inverse<T> {
	const entries = Object.entries(obj);
	const mirror = {} as Record<number, string>;
	for (const [key, value] of entries) {
		mirror[value] = key;
	}
	return Object.assign(obj, mirror) as T & Inverse<T>;
}

export default exports as typeof import("./Constants");

import STEndpoints from "snowtransfer/dist/src/Endpoints";

import { Error, RangeError } from "../errors";

const AllowedImageFormats: Array<import("../Types").AllowedImageFormat> = ["webp", "png", "jpg", "jpeg", "gif"];

const AllowedImageSizes: Array<import("../Types").ImageSize> = Array.from({ length: 9 }, (e, i) => 2 ** (i + 4) as import("../Types").ImageSize);

function makeImageUrl(root: string, options: { format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize } = { format: "png" }) {
	if (options.format && !AllowedImageFormats.includes(options.format)) throw new Error("IMAGE_FORMAT", options.format);
	if (options.size && !AllowedImageSizes.includes(options.size)) throw new RangeError("IMAGE_SIZE", options.size);
	return `${root}.${options.format}${options.size ? `?size=${options.size}` : ""}`;
}

export const Endpoints = {
	CDN(root: string) {
		return {
			Emoji: (emojiID: string, format: import("../Types").AllowedImageFormat = "png") => `${root}/emojis/${emojiID}.${format}`,
			Asset: (name: string) => `${root}/assets/${name}`,
			DefaultAvatar: (discriminator: string) => `${root}/embed/avatars/${discriminator}.png`,
			Avatar: (userID: string, hash: string, format: import("../Types").AllowedImageFormat = "png", size?: import("../Types").ImageSize, dynamic = false) => {
				if (dynamic) format = hash.startsWith("a_") ? "gif" : format;
				return makeImageUrl(`${root}/avatars/${userID}/${hash}`, { format, size });
			},
			Banner: (guildID: string, hash: string, format: import("../Types").AllowedImageFormat = "png", size?: import("../Types").ImageSize) =>
				makeImageUrl(`${root}/banners/${guildID}/${hash}`, { format, size }),
			Icon: (guildID: string, hash: string, format: import("../Types").AllowedImageFormat = "png", size?: import("../Types").ImageSize, dynamic = false) => {
				if (dynamic) format = hash.startsWith("a_") ? "gif" : format;
				return makeImageUrl(`${root}/icons/${guildID}/${hash}`, { format, size });
			},
			AppIcon: (clientID: string, hash: string, options: { format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize } = {}) =>
				makeImageUrl(`${root}/app-icons/${clientID}/${hash}`, { size: options.size, format: options.format }),
			AppAsset: (clientID: string, hash: string, options: { format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize } = { format: "png" }) =>
				makeImageUrl(`${root}/app-assets/${clientID}/${hash}`, { size: options.size, format: options.format }),
			GDMIcon: (channelID: string, hash: string, format: import("../Types").AllowedImageFormat = "png", size?: import("../Types").ImageSize) =>
				makeImageUrl(`${root}/channel-icons/${channelID}/${hash}`, { size, format }),
			Splash: (guildID: string, hash: string, format: import("../Types").AllowedImageFormat = "png", size?: import("../Types").ImageSize) =>
				makeImageUrl(`${root}/splashes/${guildID}/${hash}`, { size, format }),
			DiscoverySplash: (guildID: string, hash: string, format: import("../Types").AllowedImageFormat = "webp", size?: import("../Types").ImageSize) =>
				makeImageUrl(`${root}/discovery-splashes/${guildID}/${hash}`, { size, format }),
			TeamIcon: (teamID: string, hash: string, options: { format?: import("../Types").AllowedImageFormat, size?: import("../Types").ImageSize } = { format: "png" }) =>
				makeImageUrl(`${root}/team-icons/${teamID}/${hash}`, { size: options.size, format: options.format })
		};
	},
	invite: (root: string, code: string) => `${root}/${code}`,
	botGateway: STEndpoints.GATEWAY_BOT
};

export const Events = {
	CHANNEL_CREATE: "channelCreate" as const,
	CHANNEL_DELETE: "channelDelete" as const,
	CHANNEL_PINS_UPDATE: "channelPinsUpdate" as const,
	CHANNEL_UPDATE: "channelUpdate" as const,
	GUILD_BAN_ADD: "guildBanAdd" as const,
	GUILD_BAN_REMOVE: "guildBanRemove" as const,
	GUILD_CREATE: "guildCreate" as const,
	GUILD_DELETE: "guildDelete" as const,
	GUILD_EMOJI_CREATE: "emojiCreate" as const,
	GUILD_EMOJIS_UPDATE: "emojisUpdate" as const,
	GUILD_INTEGRATIONS_UPDATE: "guildIntegrationsUpdate" as const,
	GUILD_MEMBERS_CHUNK: "guildMembersChunk" as const,
	GUILD_MEMBER_ADD: "guildMemberAdd" as const,
	GUILD_MEMBER_REMOVE: "guildMemberRemove" as const,
	GUILD_MEMBER_UPDATE: "guildMemberUpdate" as const,
	GUILD_ROLE_CREATE: "roleCreate" as const,
	GUILD_ROLE_DELETE: "roleDelete" as const,
	GUILD_ROLE_UPDATE: "roleUpdate" as const,
	GUILD_UNAVAILABLE: "guildUnavailable" as const,
	GUILD_UPDATE: "guildUpdate" as const,
	INTERACTION_CREATE: "interaction" as const,
	INVALID_SESSION: "invalidated" as const,
	INVITE_CREATE: "inviteCreate" as const,
	INVITE_DELETE: "inviteDelete" as const,
	MESSAGE_BULK_DELETE: "messageDeleteBulk" as const,
	MESSAGE_CREATE: "message" as const,
	MESSAGE_DELETE: "messageDelete" as const,
	MESSAGE_UPDATE: "messageUpdate" as const,
	MESSAGE_REACTION_ADD: "messageReactionAdd" as const,
	MESSAGE_REACTION_REMOVE: "messageReactionRemove" as const,
	MESSAGE_REACTION_REMOVE_ALL: "messageReactionRemoveAll" as const,
	MESSAGE_REACTION_REMOVE_EMOJI: "messageReactionRemoveEmoji" as const,
	PRESENCE_UPDATE: "presenceUpdate" as const,
	RATE_LIMIT: "rateLimit" as const,
	RAW: "raw" as const,
	READY: "ready" as const,
	RESUMED: "shardResume" as const,
	SHARD_DISCONNECT: "shardDisconnect" as const,
	SHARD_READY: "shardReady" as const,
	THREAD_CREATE: "threadCreate" as const,
	THREAD_DELETE: "threadDelete" as const,
	THREAD_LIST_SYNC: "threadListSync" as const,
	THREAD_MEMBER_UPDATE: "threadMemberUpdate" as const,
	THREAD_MEMBERS_UPDATE: "threadMembersUpdate" as const,
	THREAD_UPDATE: "threadUpdate" as const,
	TYPING_START: "typingStart" as const,
	USER_UPDATE: "userUpdate" as const,
	VOICE_STATE_UPDATE: "voiceStateUpdate" as const,
	WEBHOOKS_UPDATE: "webhookUpdate" as const
};

export const PartialTypes = {
	USER: "USER" as const,
	CHANNEL: "CHANNEL" as const,
	GUILD_MEMBER: "GUILD_MEMBER" as const,
	MESSAGE: "MESSAGE" as const,
	REACTION: "REACTION" as const
};

export const InviteScopes: [
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
] = [
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

export const MessageTypes: [
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
] = [
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
];

export const SystemMessageTypes: Exclude<typeof MessageTypes, null | "DEFAULT" | "REPLY" | "APPLICATION_COMMAND"> = MessageTypes.filter(type => type && !["DEFAULT", "REPLY", "APPLICATION_COMMAND"].includes(type)) as Exclude<typeof MessageTypes, null | "DEFAULT" | "REPLY" | "APPLICATION_COMMAND">;

export const ActivityTypes: ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "CUSTOM_STATUS", "COMPETING"] = ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "CUSTOM_STATUS", "COMPETING"];

export const ClientApplicationAssetTypes = {
	SMALL: 1 as const,
	BIG: 2 as const
};

export const ChannelTypes = {
	0: "text" as const,
	text: 0 as const,
	1: "dm" as const,
	dm: 1 as const,
	2: "voice" as const,
	voice: 2 as const,
	4: "category" as const,
	category: 4 as const,
	5: "news" as const,
	news: 5 as const,
	6: "store" as const,
	store: 6 as const,
	10: "news-thread" as const,
	"news-thread": 10 as const,
	11: "public-thread" as const,
	"public-thread": 11 as const,
	12: "private-thread" as const,
	"private-thread": 12 as const,
	13: "stage" as const,
	stage: 13 as const
};

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

export const ExplicitContentFilterLevels: ["DISABLED", "MEMBERS_WITHOUT_ROLES", "ALL_MEMBERS"] = ["DISABLED", "MEMBERS_WITHOUT_ROLES", "ALL_MEMBERS"];

export const VerificationLevels: ["NONE", "LOW", "MEDIUM", "HIGH", "VERY_HIGH"] = ["NONE", "LOW", "MEDIUM", "HIGH", "VERY_HIGH"];

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

export const DefaultMessageNotifications: ["ALL", "MENTIONS"] = ["ALL", "MENTIONS"];

export const MembershipStates: [null, "INVITED", "ACCEPTED"] = [
	null,
	"INVITED",
	"ACCEPTED"
];

export const WebhookTypes: [null, "Incoming", "Channel Follower", "Application"] = [
	null,
	"Incoming",
	"Channel Follower",
	"Application"
];

export const StickerTypes = {
	1: "STANDARD" as const,
	"STANDARD": 1 as const,
	2: "GUILD" as const,
	"GUILD": 2 as const
};

export const StickerFormatTypes = {
	1: "PNG" as const,
	PNG: 1 as const,
	2: "APNG" as const,
	APNG: 2 as const,
	3: "LOTTIE" as const,
	LOTTIE: 3 as const
};

export const OverwriteTypes = {
	0: "role" as const,
	role: 0 as const,
	1: "member" as const,
	member: 1 as const
};

export const ApplicationCommandOptionTypes = {
	1: "SUB_COMMAND" as const,
	SUB_COMMAND: 1 as const,
	2: "SUB_COMMAND_GROUP" as const,
	SUB_COMMAND_GROUP: 2 as const,
	3: "STRING" as const,
	STRING: 3 as const,
	4: "INTEGER" as const,
	INTEGER: 4 as const,
	5: "BOOLEAN" as const,
	BOOLEAN: 5 as const,
	6: "USER" as const,
	USER: 6 as const,
	7: "CHANNEL" as const,
	CHANNEL: 7 as const,
	8: "ROLE" as const,
	ROLE: 8 as const,
	9: "MENTIONABLE" as const,
	MENTIONABLE: 9 as const
};

export const ApplicationCommandPermissionTypes = {
	1: "ROLE" as const,
	ROLE: 1 as const,
	2: "USER" as const,
	USER: 2 as const
};

export const InteractionTypes = {
	1: "PING" as const,
	PING: 1 as const,
	2: "APPLICATION_COMMAND" as const,
	APPLICATION_COMMAND: 2 as const,
	3: "MESSAGE_COMPONENT" as const,
	MESSAGE_COMPONENT: 3 as const
};

export const InteractionResponseTypes = {
	1: "PONG" as const,
	PONG: 1 as const,
	4: "CHANNEL_MESSAGE_WITH_SOURCE" as const,
	CHANNEL_MESSAGE_WITH_SOURCE: 4 as const,
	5: "DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE" as const,
	DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5 as const,
	6: "DEFERRED_MESSAGE_UPDATE" as const,
	DEFERRED_MESSAGE_UPDATE: 6 as const,
	7: "UPDATE_MESSAGE" as const,
	UPDATE_MESSAGE: 7 as const
};

export const MessageComponentTypes = {
	1: "ACTION_ROW" as const,
	ACTION_ROW: 1 as const,
	2: "BUTTON" as const,
	BUTTON: 2 as const
};

export const MessageButtonStyles = {
	1: "PRIMARY" as const,
	PRIMARY: 1 as const,
	2: "SECONDARY" as const,
	SECONDARY: 2 as const,
	3: "SUCCESS" as const,
	SUCCESS: 3 as const,
	4: "DANGER" as const,
	DANGER: 4 as const,
	5: "LINK" as const,
	LINK: 5 as const
};

export const SYSTEM_USER_ID = "643945264868098049";

const Constants = {
	SYSTEM_USER_ID,
	Endpoints,
	Events,
	PartialTypes,
	InviteScopes,
	MessageTypes,
	SystemMessageTypes,
	ActivityTypes,
	ClientApplicationAssetTypes,
	ChannelTypes,
	Colors,
	ExplicitContentFilterLevels,
	VerificationLevels,
	APIErrors,
	DefaultMessageNotifications,
	MembershipStates,
	WebhookTypes,
	StickerTypes,
	StickerFormatTypes,
	OverwriteTypes,
	ApplicationCommandOptionTypes,
	ApplicationCommandPermissionTypes,
	InteractionTypes,
	InteractionResponseTypes,
	MessageComponentTypes,
	MessageButtonStyles
};

export default Constants;

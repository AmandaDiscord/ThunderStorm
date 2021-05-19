const EVENTS = {
	CHANNEL_CREATE: "channelCreate" as const,
	CHANNEL_DELETE: "channelDelete" as const,
	CHANNEL_PINS_UPDATE: "channelPinsUpdate" as const,
	CHANNEL_UPDATE: "channelUpdate" as const,
	GUILD_BAN_ADD: "guildBanAdd" as const,
	GUILD_BAN_REMOVE: "guildBanRemove" as const,
	GUILD_CREATE: "guildCreate" as const,
	GUILD_DELETE: "guildDelete" as const,
	GUILD_EMOJIS_UPDATE: "emojisUpdate" as const,
	GUILD_MEMBERS_CHUNK: "guildMembersChunk" as const,
	GUILD_MEMBER_ADD: "guildMemberAdd" as const,
	GUILD_MEMBER_REMOVE: "guildMemberRemove" as const,
	GUILD_MEMBER_UPDATE: "guildMemberUpdate" as const,
	GUILD_ROLE_CREATE: "guildRoleCreate" as const,
	GUILD_ROLE_DELETE: "guildRoleDelete" as const,
	GUILD_ROLE_UPDATE: "guildRoleUpdate" as const,
	GUILD_UPDATE: "guildUpdate" as const,
	INTERACTION_CREATE: "interactionCreate" as const,
	INVALID_SESSION: "invalidated" as const,
	INVITE_CREATE: "inviteCreate" as const,
	INVITE_DELETE: "inviteDelete" as const,
	MESSAGE_CREATE: "message" as const,
	MESSAGE_DELETE: "messageDelete" as const,
	MESSAGE_DELETE_BULK: "messageDeleteBulk" as const,
	MESSAGE_UPDATE: "messageUpdate" as const,
	MESSAGE_REACTION_ADD: "messageReactionAdd" as const,
	MESSAGE_REACTION_REMOVE: "messageReactionRemove" as const,
	MESSAGE_REACTION_REMOVE_ALL: "messageReactionRemoveAll" as const,
	MESSAGE_REACTION_REMOVE_EMOJI: "messageReactionRemoveEmoji" as const,
	READY: "ready" as const,
	RESUMED: "shardResume" as const,
	SHARD_READY: "shardReady" as const,
	THREAD_CREATE: "threadCreate" as const,
	THREAD_DELETE: "threadDelete" as const,
	THREAD_LIST_SYNC: "threadListSync" as const,
	THREAD_MEMBER_UPDATE: "threadMemberUpdate" as const,
	THREAD_MEMBERS_UPDATE: "threadMembersUpdate" as const,
	THREAD_UPDATE: "threadUpdate" as const,
	TYPING_START: "typingStart" as const,
	USER_UPDATE: "userUpdate" as const,
	VOICE_STATE_UPDATE: "voiceStateUpdate" as const
};

const CLIENT_ONLY_EVENTS = {
	GUILD_UNAVAILABLE: "guildUnavailable" as const,
	RATE_LIMIT: "rateLimit" as const,
	RAW: "raw" as const,
	SHARD_DISCONNECT: "shardDisconnect" as const,
	SHARD_READY: "shardReady" as const
};

const Colors = {
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

const PERMISSION_FLAGS = {
	CREATE_INSTANT_INVITE: BigInt(1) << BigInt(0),
	KICK_MEMBERS: BigInt(1) << BigInt(1),
	BAN_MEMBERS: BigInt(1) << BigInt(2),
	ADMINISTRATOR: BigInt(1) << BigInt(3),
	MANAGE_CHANNELS: BigInt(1) << BigInt(4),
	MANAGE_GUILD: BigInt(1) << BigInt(5),
	ADD_REACTIONS: BigInt(1) << BigInt(6),
	VIEW_AUDIT_LOG: BigInt(1) << BigInt(7),
	PRIORITY_SPEAKER: BigInt(1) << BigInt(8),
	STREAM: BigInt(1) << BigInt(9),
	VIEW_CHANNEL: BigInt(1) << BigInt(10),
	SEND_MESSAGES: BigInt(1) << BigInt(11),
	SEND_TTS_MESSAGES: BigInt(1) << BigInt(12),
	MANAGE_MESSAGES: BigInt(1) << BigInt(13),
	EMBED_LINKS: BigInt(1) << BigInt(14),
	ATTACH_FILES: BigInt(1) << BigInt(15),
	READ_MESSAGE_HISTORY: BigInt(1) << BigInt(16),
	MENTION_EVERYONE: BigInt(1) << BigInt(17),
	USE_EXTERNAL_EMOJIS: BigInt(1) << BigInt(18),
	VIEW_GUILD_INSIGHTS: BigInt(1) << BigInt(19),
	CONNECT: BigInt(1) << BigInt(20),
	SPEAK: BigInt(1) << BigInt(21),
	MUTE_MEMBERS: BigInt(1) << BigInt(22),
	DEAFEN_MEMBERS: BigInt(1) << BigInt(23),
	MOVE_MEMBERS: BigInt(1) << BigInt(24),
	USE_VAD: BigInt(1) << BigInt(25),
	CHANGE_NICKNAME: BigInt(1) << BigInt(26),
	MANAGE_NICKNAMES: BigInt(1) << BigInt(27),
	MANAGE_ROLES: BigInt(1) << BigInt(28),
	MANAGE_WEBHOOKS: BigInt(1) << BigInt(29),
	MANAGE_EMOJIS: BigInt(1) << BigInt(30)
};

const USER_FLAGS = {
	DISCORD_EMPLOYEE: BigInt(1) << BigInt(0),
	PARTNERED_SERVER_OWNER: BigInt(1) << BigInt(1),
	DISCORD_PARTNER: BigInt(1) << BigInt(1),
	HYPESQUAD_EVENTS: BigInt(1) << BigInt(2),
	BUGHUNTER_LEVEL_1: BigInt(1) << BigInt(3),
	HOUSE_BRAVERY: BigInt(1) << BigInt(6),
	HOUSE_BRILLIANCE: BigInt(1) << BigInt(7),
	HOUSE_BALANCE: BigInt(1) << BigInt(8),
	EARLY_SUPPORTER: BigInt(1) << BigInt(9),
	TEAM_USER: BigInt(1) << BigInt(10),
	SYSTEM: BigInt(1) << BigInt(12),
	BUGHUNTER_LEVEL_2: BigInt(1) << BigInt(14),
	VERIFIED_BOT: BigInt(1) << BigInt(16),
	EARLY_VERIFIED_DEVELOPER: BigInt(1) << BigInt(17),
	VERIFIED_DEVELOPER: BigInt(1) << BigInt(17),
	CERTIFIED_MODERATOR: BigInt(1) << BigInt(18)
};

const SYSTEM_CHANNEL_FLAGS = {
	WELCOME_MESSAGE_DISABLED: BigInt(1) << BigInt(0),
	BOOST_MESSAGE_DISABLED: BigInt(1) << BigInt(1)
};

const MESSAGE_FLAGS = {
	CROSSPOSTED: BigInt(1) << BigInt(0),
	IS_CROSSPOST: BigInt(1) << BigInt(1),
	SUPPRESS_EMBEDS: BigInt(1) << BigInt(2),
	SOURCE_MESSAGE_DELETED: BigInt(1) << BigInt(3),
	URGENT: BigInt(1) << BigInt(4),
	HAS_THREAD: BigInt(1) << BigInt(5),
	EPHEMERAL: BigInt(1) << BigInt(6),
	LOADING: BigInt(1) << BigInt(7)
};

const GUILD_VERIFICATION_LEVELS = {
	0: "NONE" as const,
	1: "LOW" as const,
	2: "MEDIUM" as const,
	3: "HIGH" as const,
	4: "VERY_HIGH" as const
};

const CHANNEL_TYPES = {
	0: "text" as const,
	1: "dm" as const,
	2: "voice" as const,
	4: "category" as const,
	5: "news" as const,
	6: "store" as const,
	10: "news-thread" as const,
	11: "text-thread" as const,
	12: "text-thread" as const,
	13: "stage" as const
};

const COMMAND_TYPES = {
	1: "command" as const,
	2: "group" as const,
	3: "string" as const,
	4: "number" as const,
	5: "boolean" as const,
	6: "user" as const,
	7: "channel" as const,
	8: "role" as const,
	9: "mentionable" as const
};

const API_VERSION = 9;

const Constants = {
	API_VERSION,
	BASE_API_ENDPOINT: `/api/v${API_VERSION}`,
	BASE_CDN_URL: "https://cdn.discordapp.com",
	BASE_HOST: "https://discord.com",
	SYSTEM_USER_ID: "643945264868098049",
	CLIENT_ONLY_EVENTS,
	Colors,
	PERMISSION_FLAGS,
	USER_FLAGS,
	SYSTEM_CHANNEL_FLAGS,
	MESSAGE_FLAGS,
	GUILD_VERIFICATION_LEVELS,
	CHANNEL_TYPES,
	COMMAND_TYPES,
	EVENTS
};

export = Constants;

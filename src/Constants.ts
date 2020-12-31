const EVENTS = {
	CHANNEL_CREATE: "channelCreate" as const,
	CHANNEL_PINS_UPDATE: "channelPinsUpdate" as const,
	GUILD_CREATE: "guildCreate" as const,
	GUILD_DELETE: "guildDelete" as const,
	GUILD_EMOJIS_UPDATE: "guildEmojisUpdate" as const,
	GUILD_MEMBER_UPDATE: "guildMemberUpdate" as const,
	GUILD_ROLE_CREATE: "guildRoleCreate" as const,
	GUILD_ROLE_DELETE: "guildRoleDelete" as const,
	GUILD_ROLE_UPDATE: "guildRoleUpdate" as const,
	MESSAGE_CREATE: "message" as const,
	MESSAGE_DELETE: "messageDelete" as const,
	MESSAGE_UPDATE: "messageUpdate" as const,
	MESSAGE_REACTION_ADD: "messageReactionAdd" as const,
	MESSAGE_REACTION_REMOVE: "messageReactionRemove" as const,
	MESSAGE_REACTION_REMOVE_ALL: "messageReactionRemoveAll" as const,
	READY: "ready" as const,
	SHARD_READY: "shardReady" as const,
	RESUMED: "ready" as const,
	VOICE_STATE_UPDATE: "voiceStateUpdate" as const
};

const CLIENT_ONLY_EVENTS = {
	EVENT: "raw" as const,
	SHARD_DISCONNECT: "shardDisconnect" as const,
	SHARD_RESUMED: "shardResume" as const
};

const CLOUD_ONLY_EVENTS = {
	DISCONNECTED: "disconnected" as const,
	EVENT: "event" as const
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
	RANDOM: "lol"
};

const API_VERSION = 8;

const Constants = {
	API_VERSION,
	BASE_API_ENDPOINT: `/api/v${API_VERSION}`,
	BASE_CDN_URL: "https://cdn.discordapp.com",
	BASE_HOST: "https://discord.com",
	SYSTEM_USER_ID: "643945264868098049",
	CLIENT_ONLY_EVENTS,
	CLOUD_ONLY_EVENTS,
	Colors,
	EVENTS
};

export = Constants;
